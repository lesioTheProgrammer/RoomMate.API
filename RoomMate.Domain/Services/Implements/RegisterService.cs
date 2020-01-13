using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RoomMate.Domain.Services.Implements
{

    public class RegisterService : IRegisterService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Address> _addressRepository;
        private readonly IRepository<City> _cityRepository;


        public RegisterService(IRepository<User> userRepository,
            IRepository<City> cityRepository,
            IRepository<Address> addressRepository)
        {
            this._userRepository = userRepository;
            this._addressRepository = addressRepository;
            this._cityRepository = cityRepository;
        }


        public bool RegisterUser(RegisterDto registerDto)
        {
            //check unique values of login and email
            if (IsUserTaken(registerDto.Login, registerDto.Email))
            {
                return false;
            }
            //tu mielonka dto przekazuje z register dto i potem wale tym do repo?
            //w repo jeszcze robie czysty obiekt do inserta do tabeli
            //crypting password
            var crypto = new SimpleCrypto.PBKDF2();
            registerDto.Password = crypto.Compute(registerDto.Password); //crypted pass
            registerDto.PasswordSalt = crypto.Salt; //salt
            //add missing parts of user to registerDto and pass it to the convertToTarget
            registerDto.Active = true;
            registerDto.Code = ""; //usefull on reset password only
            registerDto.CreatedBy = null;
            registerDto.CreatedDate = DateTime.Now;
            registerDto.ModificatedDate = DateTime.Now;
            registerDto.ModificatedBy = null;
            //add user to db
            try
            {
                var user = this.ConvertToTarget(registerDto);
                this._userRepository.InsertOrUpdate(user);
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool IsUserTaken(string login, string email)
        {
            bool taken = false;
            var user = _userRepository.GetFirst(x => x.Login == login || x.Email == email);
            if (user != null && user.Active == true)
            {
                taken = true;
            }
            return taken;
        }



        public User ConvertToTarget(RegisterDto registerDto)
        {
            return new User
            {
                Active = registerDto.Active,
                Code = registerDto.Code,
                CreatedDate = registerDto.CreatedDate,
                CreatedBy = registerDto.CreatedBy,
                Email = registerDto.Email,
                Login = registerDto.Login,
                ModificatedBy = registerDto.ModificatedBy,
                ModificatedDate = registerDto.ModificatedDate,
                Name = registerDto.Name,
                Password = registerDto.Password,
                PasswordSalt = registerDto.PasswordSalt,
                Surname = registerDto.Surname,
                RoleType = registerDto.RoleType
            };
        }

        public AddressDto ConvertToAddrDto(Address address)
        {
            return new AddressDto()
            {
                CityId = address.CityId,
                CityName = address.City.CityName,
                Street = address.Street,
                HouseNumber = address.HouseNumber,
                FlatNumber = address.FlatNumber
            };
        }

        public CityDto ConvertToCityDto(City city)
        {
            return new CityDto()
            {
                CityId = city.Id,
                CityName = city.CityName
            };
        }

        public List<CityDto> GetCitiesByName(string letters)
        {
            //what with tolower?
            var cityDtoList = new List<CityDto>();
            var lowerCityLett = letters.ToLower();
            var citiesList = _cityRepository.GetList(x => x.CityName.ToLower().Contains(lowerCityLett)
            && x.CityName.ToLower().StartsWith(lowerCityLett));

            if (citiesList.Any())
            {
                foreach (var city in citiesList)
                {
                    cityDtoList.Add(this.ConvertToCityDto(city));
                }
            }
            return cityDtoList;
        }

        public IList<AddressDto> GetAddressByCityId(int id, string streetLetters)
        {
            var addresDtoList = new List<AddressDto>();
            var lowerStrLetters = streetLetters.ToLower();
            //take all addreses by cityID and startingLetters
            //include cityName as I wish
            var listOfAddreses = _addressRepository.GetListWithInclude(x => x.CityId == id && 
            x.Street.ToLower().Contains(lowerStrLetters) && x.Street.ToLower().StartsWith(lowerStrLetters), c=>c.City);

            if (listOfAddreses.Any())
            {
                foreach (var address in listOfAddreses)
                {
                    addresDtoList.Add(ConvertToAddrDto(address));
                }
            }
            return addresDtoList;
        }
    }
}
