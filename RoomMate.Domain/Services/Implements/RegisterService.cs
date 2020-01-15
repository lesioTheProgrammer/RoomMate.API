using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;

namespace RoomMate.Domain.Services.Implements
{

    public class RegisterService : IRegisterService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IAddressService  _addressService;


        public RegisterService(IRepository<User> userRepository,
             IAddressService addressService)
        {
            this._userRepository = userRepository;
            //what with dependency? added to service addresDepencendy
            this._addressService = addressService;
        }


        public bool RegisterUser(RegisterDto registerDto)
        {
            bool isRegistered = false;
            int idOfJustCreatedUser = 0;

            //check unique values of login and email
            if (IsUserTaken(registerDto.Login, registerDto.Email))
            {
                return isRegistered;
            }
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
                isRegistered =  true;
                idOfJustCreatedUser = user.Id;

            }
            catch (Exception ex)
            {
                isRegistered =  false;
            }
           
            //tu o metoda do inputow w tabeli adres i polaczyc to z userem
            // onyly if user seleceted valid addres
            //if user is registered correctly then insert the address otherwise thers no point
            if (ValidationDto.IsValidId(registerDto.AddressDto.Id) && isRegistered == true)
            {
                isRegistered = _addressService.AddAddressUserSelected(registerDto.AddressDto, idOfJustCreatedUser);
            }
            //if user selected only city
            else if (!ValidationDto.IsValidId(registerDto.AddressDto.Id)
                && ValidationDto.IsValidId(registerDto.AddressDto.CityId))
            {

            }

            return isRegistered;
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



        private User ConvertToTarget(RegisterDto registerDto)
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

        
        

        public List<CityDto> GetCitiesByName(string letters)
        {
            //antipatern???
            return _addressService.GetCitiesByName(letters);
        }

        public IList<AddressDto> GetAddressByCityId(int id, string streetLetters)
        {
            return _addressService.GetAddressByCityId(id, streetLetters);
        }
    }
}
