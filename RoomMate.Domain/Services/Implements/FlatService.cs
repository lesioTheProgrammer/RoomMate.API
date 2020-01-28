using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RoomMate.Domain.Services.Implements
{
    public class FlatService : IFlatService
    {
        private readonly IRepository<Flat> _flatRepository;
        private readonly IRepository<UserFlat> _userFlatRepository;
        private readonly IRepository<User> _userRepository;


        public FlatService(IRepository<Flat> flatRepository, IRepository<UserFlat> userFlatRepository,
            IRepository<User> userRepo)
        {
            this._flatRepository = flatRepository;
            this._userFlatRepository = userFlatRepository;
            this._userRepository = userRepo;
        }

        public int GetCountOfFlats()
        {
            var allFlats = _flatRepository.GetList();

            return allFlats.Count();
        }

        public FlatDto GetFlatById(int flatId)
        {
            var flat = this._flatRepository.GetFirst(x => x.Id == flatId);

            if (flat != null)
            {
                var flatDto = new FlatDto()
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


        public bool AddFlatToUser(AddressDto addressDto)
        {
            if (addressDto != null)
            {
                try
                {
                    var flatID = this._flatRepository.GetFirst(x => x.AddressId == addressDto.Id).Id;
                    var userID = this._userRepository.GetFirst(x => x.Login.ToLower() == addressDto.LoggedUserName.ToLower()).Id;
                    var userFlat = new UserFlat()
                    {
                        UserId = userID,
                        FlatId = flatID
                    };
                    this._userFlatRepository.InsertOrUpdate(userFlat);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return false;
        }


        public bool LeaveFlat(AddressDto addressDto)
        {
            if (addressDto != null && addressDto.Id != 0)
            {
                try
                {
                    var flatID = this._flatRepository.GetFirst(x => x.AddressId == addressDto.Id).Id;
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