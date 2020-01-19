using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RoomMate.Domain.Services.Implements
{
    public class AddressService : IAddressService
    {
        // Method to register address
        private readonly IRepository<Address> _addressRepository;
        private readonly IRepository<City> _cityRepository;
        private readonly IFlatService flatSerivce;
        private readonly IUserService userService;


        public AddressService(IRepository<Address> address, IRepository<City> city, IFlatService flatservice,
           IUserService userService)
        {
            this._addressRepository = address;
            this._cityRepository = city;
            this.flatSerivce = flatservice;
            this.userService = userService;
        }


        public List<CityDto> GetCitiesByName(string letters)
        {
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
        private CityDto ConvertToCityDto(City city)
        {
            return new CityDto()
            {
                CityId = city.Id,
                CityName = city.CityName
            };
        }

        public AddressDto GetAddressByFlatHouseNumb(string houseNumber, string flatNumber)
        {
            var addressDto = new AddressDto();
            var address = _addressRepository.GetFirstWithInclude(x => x.HouseNumber == houseNumber && x.FlatNumber == flatNumber,
                u => u.City, f => f.Flat);
            // get users in flat 
            var userDtoList = this.userService.GetUserByFlatId(address.Flat.Id);
            try
            {
                addressDto =  ConvertToAddressUSersDto(address, userDtoList);

            }
            catch (Exception ex)
            {
                string mess = ex.Message;
            }
            return addressDto;
        }

        public AddressDto ConvertToAddressUSersDto(Address addr, List<UserListDto> userDtoList)
        {
            //no need to check userDtoList to null because reference types (ICollection here, are always nullable)
            return new AddressDto()
            {
                HouseNumber = addr.HouseNumber,
                FlatNumber = addr.FlatNumber,
                Street = addr.Street,
                CityName = addr.City.CityName,
                CreatedBy = addr.Flat.CreatedBy,
                RoomCount = addr.Flat.RoomCount,
                FlatName = addr.Flat.FlatName,
                Users = userDtoList
            };
        }

        public IList<AddressDto> GetAddressByCityId(int id, string streetLetters)
        {
            var addresDtoList = new List<AddressDto>();
            var lowerStrLetters = streetLetters.ToLower();
            var listOfAddreses = _addressRepository.GetListWithInclude(x => x.CityId == id &&
            x.Street.ToLower().Contains(lowerStrLetters) && x.Street.ToLower().StartsWith(lowerStrLetters), c => c.City);

            if (listOfAddreses.Any())
            {
                foreach (var address in listOfAddreses)
                {
                    addresDtoList.Add(ConvertToAddrDto(address));
                }
            }
            return addresDtoList;
        }

        private AddressDto ConvertToAddrDto(Address address)
        {
            return new AddressDto()
            {
                Id = address.Id,
                CityId = address.CityId,
                CityName = address.City.CityName,
                Street = address.Street,
                HouseNumber = address.HouseNumber,
                FlatNumber = address.FlatNumber
            };
        }

        public bool AddAddressUserSelected(AddressDto address, int idOfJustCreatedUser)
        {
            return flatSerivce.AddFlatToUser(idOfJustCreatedUser, address.Id);
        }

    }
}
