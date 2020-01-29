﻿using RoomMate.Database.Models;
using RoomMate.Database.Models.Enums;
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
        private readonly IRepository<Flat> _flatRepository;
        private readonly IRepository<UserFlat> _userFlatRepository;
        private readonly IRepository<User> _userRepository;

        private readonly IUserService userService;


        public AddressService(IRepository<Address> address, IRepository<City> city, IRepository<Flat> flat, IRepository<UserFlat> userFlat,
           IRepository<User> user,
           IUserService userService)
        {
            this._addressRepository = address;
            this._cityRepository = city;
            this._flatRepository = flat;
            this._userFlatRepository = userFlat;
            this._userRepository = user;
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

        public AddressFlatDto GetAddressByFlatHouseNumb(AddressFlatDto addressDto)
        {
            var addressDtoReturned = new AddressFlatDto();
            var userDtoList = new List<UserListDto>();
            var address = _addressRepository.GetFirstWithInclude(x => x.HouseNumber == addressDto.HouseNumber && x.FlatNumber == addressDto.FlatNumber
            && x.Street.ToLower() == addressDto.Street.ToLower() && x.CityId == addressDto.CityId, u => u.City, f => f.Flat);
            // get users in flat 
            if (address != null)
            {
                userDtoList = this.userService.GetUserByFlatId(address.Flat.Id);
            }
            else
            {
                return new AddressFlatDto()
                {
                    HouseNumber = addressDto.HouseNumber,
                    FlatNumber = addressDto.FlatNumber,
                    Street = addressDto.Street,
                    CityName = _cityRepository.GetFirst(x => x.Id == addressDto.CityId).CityName,
                    CityId = addressDto.CityId
                };
            }
            try
            {
                addressDtoReturned = ConvertToAddressUsersDto(address, userDtoList);

            }
            catch (Exception ex)
            {
                string mess = ex.Message;
            }
            return addressDtoReturned;
        }

        public AddressFlatDto ConvertToAddressUsersDto(Address addr, List<UserListDto> userDtoList)
        {
            return new AddressFlatDto()
            {
                AddressId = addr.Id,
                HouseNumber = addr.HouseNumber,
                FlatNumber = addr.FlatNumber,
                Street = addr.Street,
                CityName = addr.City.CityName,
                CreatedBy = addr.Flat.CreatedBy,
                RoomCount = addr.Flat.RoomCount,
                FlatName = addr.Flat.FlatName,
                CityId = addr.CityId,
                Users = userDtoList
            };
        }

        public IList<string> GetStreetsDistincted(int id, string streetLetters)
        {
            // get only addreses with certain street names
            var distinctStreets = _addressRepository.GetDistinct(pred => pred.CityId == id && pred.Street.ToLower().Contains(streetLetters.ToLower()), x => x.Street);
            if (distinctStreets.Any())
            {
                return distinctStreets;
            }
            return new List<string>();
        }

        private AddressFlatDto ConvertToAddrDto(Address address)
        {
            return new AddressFlatDto()
            {
                AddressId = address.Id,
                CityId = address.CityId,
                CityName = address.City.CityName,
                Street = address.Street,
                HouseNumber = address.HouseNumber,
                FlatNumber = address.FlatNumber
            };
        }


        // flats


        public AddressFlatDto AddNewFlat(AddressFlatDto addressFlatDto)
        {
            //return good flat 
           var user = _userRepository.GetFirst(x => x.Login.ToLower() == addressFlatDto.LoggedUserName);
           if (user != null)
            {
                try
                {
                    var address = ConvertToTarget(addressFlatDto,  user);
                    _addressRepository.InsertOrUpdate(address);
                    // i have to pass addressID to the flat later on
                    
                    var flat = ConvertToTarget(addressFlatDto, address.Id, user);
                    _flatRepository.InsertOrUpdate(flat);

                    var userflat = ConvertToTarget(flat.Id,  user.Id, addressFlatDto.RoleType);
                    _userFlatRepository.InsertOrUpdate(userflat);

                    //return same dto as you ask for when you click search
                    return GetAddressByFlatHouseNumb(addressFlatDto);
                }
                catch (Exception ex)
                {

                }
            }
                return new AddressFlatDto();
        }

        private Address ConvertToTarget(AddressFlatDto addressFlatDto, User user)
        {
            return new Address
            {
                Active = true,
                CityId = addressFlatDto.CityId,
                CreatedBy = user.Id,
                CreatedDate = DateTime.Now,
                FlatNumber = addressFlatDto.FlatNumber,
                HouseNumber = addressFlatDto.HouseNumber,
                ModificatedBy = null,
                ModificatedDate = DateTime.Now,
                Street = addressFlatDto.Street
            };
        }

        private Flat ConvertToTarget(AddressFlatDto addressFlatDto, int newAddrID, User user)
        {
            return new Flat
            {
                Active = true,
                Area = addressFlatDto.Area,
                CreatedBy = user.Id,
                CreatedDate = DateTime.Now,
                AddressId = newAddrID,
                FlatName = addressFlatDto.FlatName,
                ModificatedBy = user.Id,
                ModificatedDate = DateTime.Now,
                RoomCount = addressFlatDto.RoomCount
            };
        }
            
        

        public int GetCountOfFlats()
        {
            var allFlats = _flatRepository.GetList();

            return allFlats.Count();
        }

        public AddressFlatDto GetFlatById(int flatId)
        {
            var flat = this._flatRepository.GetFirst(x => x.Id == flatId);

            if (flat != null)
            {
                var flatDto = new AddressFlatDto()
                {
                    Id = flat.Id,
                    Active = flat.Active,
                    Area = flat.Area,
                    FlatName = flat.FlatName
                };

                return flatDto;
            }

            return null;
        }

        public List<Flat> GetUserFlat(int userId)
        {
            var userFlatIdList = this._userFlatRepository.GetList(x => x.UserId == userId).Select(x => x.FlatId);

            if (userFlatIdList.Any())
            {
                var userFlat = this._flatRepository.GetList(x => x.Active && userFlatIdList.Contains(x.Id));

                if (userFlat.Any())
                {
                    return userFlat.ToList();
                }
            }

            return null;
        }


        public bool AddFlatToUser(AddressFlatDto addressDto)
        {
            if (addressDto != null)
            {
                try
                {
                    var flatID = this._flatRepository.GetFirst(x => x.AddressId == addressDto.Id).Id;
                    var userID = this._userRepository.GetFirst(x => x.Login.ToLower() == addressDto.LoggedUserName.ToLower()).Id;
                    this._userFlatRepository.InsertOrUpdate(ConvertToTarget(flatID, userID, addressDto.RoleType));
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return false;
        }

        public UserFlat ConvertToTarget(int flatID, int userID, RoleTypeEnum role)
        {
            return new UserFlat
            {
                UserId = userID,
                FlatId = flatID,
                RoleType = role
            };
        }


        public bool LeaveFlat(AddressFlatDto addressDto)
        {
            if (addressDto != null && addressDto.AddressId != 0)
            {
                try
                {
                    var flatID = this._flatRepository.GetFirst(x => x.AddressId == addressDto.AddressId).Id;
                    var userID = this._userRepository.GetFirst(x => x.Login.ToLower() == addressDto.LoggedUserName.ToLower()).Id;

                    var userFlat = this._userFlatRepository.GetFirst(x => x.UserId == userID && x.FlatId == flatID);
                    if (userFlat != null)
                    {
                        this._userFlatRepository.Delete(userFlat);
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return false;
        }


    }
}
