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
        private readonly IRepository<User> userRepository;

        public HouseworkService(IRepository<Housework> houseWorkRepository,
            IRepository<WorkPrice> workPricekRepository, IRepository<User> userRepository)
        {
            this.houseWorkRepository = houseWorkRepository;
            this.workPricekRepository = workPricekRepository;
            this.userRepository = userRepository;
        }

        public bool AddNewHouseWork(HouseWorkDto houseWorkDto)
        {
            // get userID? why here, not in angular - do I have to inejcty userRepo to every 
            // service just to get userid? lol
            var user = this.userRepository.GetFirst(x => x.Login.ToLower() == houseWorkDto.Username.ToLower());
            if (user != null)
            {
                houseWorkDto.UserId = user.Id;
                try
                {
                    var houseWork = this.ConverterToTarget(houseWorkDto);
                    this.houseWorkRepository.InsertOrUpdate(houseWork);

                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return false;
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
                WorkType = houseWork.WorkType,
                Login = houseWork.User.Login
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
                ModificatedDate = DateTime.Now   // check it on all occurences
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
                    if (houseWork.Active == true)
                    {
                        houseWorkList.Add(this.ConverterToDto(houseWork));
                    }
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

        public Housework EditHouseWork(HouseWorkDto houseWorkDto)
        {
            // TODO: add price here too!

            var user = this.userRepository.GetFirst(x => x.Login == houseWorkDto.Login);
            if (user != null && user.Id == houseWorkDto.UserId)
            {
                var houseWorkToEdit = this.houseWorkRepository.GetFirstWithInclude(x => x.Id == houseWorkDto.Id, p => p.WorkPrice);
                if (houseWorkToEdit != null)
                {
                    try
                    {
                        // tutaj price id nie bedzie nulem bo bedzie wyciagnieta wiec trzeba zupdejtowac to tylko
                        if (houseWorkDto.WorkType == WorkTypeEnum.Shopping)
                        {
                            try
                            {
                                if (houseWorkToEdit.WorkPrice != null)
                                {
                                    houseWorkToEdit.WorkPrice.Prices = houseWorkDto.Prices.Value;
                                    this.workPricekRepository.SaveChanges();
                                }
                                else
                                {
                                    return new Housework(); // return empty if price save will not succeed
                                }
                            }
                            catch (Exception ex)
                            {
                                throw;
                            }
                        }

                        houseWorkToEdit.Description = houseWorkDto.Description;
                        houseWorkToEdit.HouseWorkDate = houseWorkDto.HouseWorkDate;
                        houseWorkToEdit.UserId = houseWorkDto.UserId;
                        houseWorkToEdit.ModificatedDate = DateTime.Now;

                        this.houseWorkRepository.SaveChanges();
                        return houseWorkToEdit;
                    }
                    catch (Exception ex)
                    {
                        var mess = ex.Message;
                        throw;
                    }
                }
            }
            return new Housework();
        }
    }
}