using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RoomMate.Domain.Services.Implements
{
    public class FlatService : IFlatService
    {
        private readonly IRepository<Flat> flatRepository;
        private readonly IRepository<UserFlat> userFlatRepository;

        public FlatService(IRepository<Flat> flatRepository, IRepository<UserFlat> userFlatRepository)
        {
            this.flatRepository = flatRepository;
            this.userFlatRepository = userFlatRepository;
        }

        public int GetCountOfFlats()
        {
            var allFlats = flatRepository.GetList();

            return allFlats.Count();
        }

        public FlatDto GetFlatById(int flatId)
        {
            var flat = this.flatRepository.GetFirst(x => x.Id == flatId);

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
            var userFlatIdList = this.userFlatRepository.GetList(x => x.UserId == userId).Select(x => x.FlatId);

            if (userFlatIdList.Any())
            {
                var userFlat = this.flatRepository.GetList(x => x.Active && userFlatIdList.Contains(x.Id));

                if (userFlat.Any())
                {
                    return userFlat.ToList();
                }
            }

            return null;
        }
    }
}