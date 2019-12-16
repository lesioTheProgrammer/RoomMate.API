using RoomMate.Database.Models;
using RoomMate.Database.Models.Enums;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RoomMate.Domain.Services.Implements
{
    public class HouseworkService : IHouseworkService
    {
        private readonly IRepository<Housework> houseWorkRepository;
        private readonly IRepository<WorkPrice> workPricekRepository;

        public HouseworkService(IRepository<Housework> houseWorkRepository, IRepository<WorkPrice> workPricekRepository)
        {
            this.houseWorkRepository = houseWorkRepository;
            this.workPricekRepository = workPricekRepository;
        }

        public bool AddNewHouseWork(HouseWorkDto houseWorkDto)
        {
            try
            {
                var houseWork = this.ConverterToTarget(houseWorkDto);
                this.houseWorkRepository.InsertOrUpdate(houseWork);

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public HouseWorkDto ConverterToDto(Housework houseWork)
        {
            return new HouseWorkDto()
            {
                Active = houseWork.Active,
                CreatedBy = houseWork.CreatedBy,
                CreatedDate = houseWork.CreatedDate,
                Description = houseWork.Description,
                FlatId = houseWork.FlatId,
                HouseWorkDate = houseWork.HouseWorkDate,
                Id = houseWork.Id,
                ModificatedBy = houseWork.ModificatedBy,
                ModificatedDate = houseWork.ModificatedDate,
                UserId = houseWork.UserId,
                Username = houseWork.User.Name + " " + houseWork.User.Surname,
                Prices = houseWork.WorkPriceId != null ? houseWork.WorkPrice.Prices : 0,
                WorkType = houseWork.WorkType
            };
        }

        public Housework ConverterToTarget(HouseWorkDto houseWork)
        {
            int? priceId = null;
            if (houseWork.WorkType == WorkTypeEnum.Shopping)
            {
                var newPrice = new WorkPrice();
                newPrice.Prices = houseWork.Prices.Value;
                this.workPricekRepository.InsertOrUpdate(newPrice);
                priceId = newPrice.Id;
            }

            return new Housework()
            {
                FlatId = houseWork.FlatId,
                Description = houseWork.Description,
                HouseWorkDate = houseWork.HouseWorkDate,
                UserId = houseWork.UserId,
                WorkType = houseWork.WorkType,
                WorkPriceId = priceId,
            };
        }

        public List<HouseWorkDto> GetHouseWorkListForFlat(int flatId, WorkTypeEnum workType)
        {
            var houseWorkList = new List<HouseWorkDto>();

            var houseWorks = this.houseWorkRepository.GetListWithInclude(x => x.FlatId == flatId && x.WorkType == workType, u => u.User, p => p.WorkPrice);

            if (houseWorks.Any())
            {
                foreach (var houseWork in houseWorks)
                {
                    houseWorkList.Add(this.ConverterToDto(houseWork));
                }
            }

            return houseWorkList;
        }

        public List<HouseWorkDto> GetHouseWorkListForUser(int userId)
        {
            var houseWorkList = new List<HouseWorkDto>();

            var houseWorks = this.houseWorkRepository.GetList(x => x.UserId == userId);

            if (houseWorks.Any())
            {
                foreach (var houseWork in houseWorks)
                {
                    houseWorkList.Add(this.ConverterToDto(houseWork));
                }
            }

            return houseWorkList;
        }
    }
}