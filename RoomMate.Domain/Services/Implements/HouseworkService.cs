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
                newPrice.CreatedBy = houseWork.UserId;
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
                ModificatedDate = DateTime.Now,
                CreatedBy = houseWork.UserId
            };
        }

        public List<HouseWorkDto> GetHouseWorkListForFlat(int flatId, WorkTypeEnum workType)
        {
            var houseWorkList = new List<HouseWorkDto>();

            var houseWorks = this.houseWorkRepository.GetListWithInclude(x => x.FlatId == flatId &&
            x.WorkType == workType, u => u.User, p => p.WorkPrice);

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
                    if (houseWork.Active == true)
                    {
                        houseWorkList.Add(this.ConverterToDto(houseWork));
                    }
                }
            }
            return houseWorkList;
        }

        public HouseWorkDto EditHouseWork(HouseWorkDto houseWorkDto)
        {
            var user = this.userRepository.GetFirst(x => x.Login == houseWorkDto.Login);
            if (user != null && user.Id == houseWorkDto.UserId)
            {
                var houseWorkToEdit = this.houseWorkRepository.GetFirstWithInclude(x => x.Id == houseWorkDto.Id && x.Active == true,
                    p => p.WorkPrice);
                if (houseWorkToEdit != null)
                {
                    try
                    {
                        if (houseWorkDto.WorkType == WorkTypeEnum.Shopping)
                        {
                            try
                            {
                                if (houseWorkToEdit.WorkPrice != null && houseWorkToEdit.WorkPrice.Active == true)
                                {
                                    houseWorkToEdit.WorkPrice.Prices = houseWorkDto.Prices.Value;
                                    houseWorkToEdit.WorkPrice.ModificatedBy = houseWorkDto.UserId;
                                    this.workPricekRepository.SaveChanges();
                                }
                                else
                                {
                                    return new HouseWorkDto(); // return empty if price save will not succeed
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
                        houseWorkToEdit.ModificatedBy = houseWorkDto.UserId;
                        this.houseWorkRepository.SaveChanges();
                        return ConverterToDto(houseWorkToEdit);
                    }
                    catch (Exception ex)
                    {
                        var mess = ex.Message;
                        throw;
                    }
                }
            }
            return new HouseWorkDto();
        }


        public bool RemoveHouseWork(HouseWorkDto houseWorkDto)
        {

            // sprawdzanie id juz zrobione
            // sprawdz czy istnieje taki hw i czy login sie zgadza z autorem
            var user = this.userRepository.GetFirst(x => x.Login.ToLower() == houseWorkDto.Login.ToLower());

            if (user != null)
            {
                try
                {
                    var houseWorkToDelete = this.houseWorkRepository.GetFirst(x => x.Id == houseWorkDto.Id);
                    if (houseWorkToDelete != null &&  houseWorkToDelete.WorkType == WorkTypeEnum.Clean)
                    {
                        try
                        {
                            houseWorkToDelete.Active = false;
                            this.houseWorkRepository.SaveChanges();
                            return true;
                        }
                        catch (Exception ex)
                        {
                            return false;
                            throw ex;
                        }
                    }


                    else if (houseWorkToDelete != null && houseWorkToDelete.WorkType == WorkTypeEnum.Shopping)
                    {
                        try
                        {
                            houseWorkToDelete.Active = false;
                            this.houseWorkRepository.SaveChanges();


                            var workPrice = this.workPricekRepository.GetFirst(x => x.Id == houseWorkToDelete.WorkPriceId);
                            if (workPrice != null)
                            {
                                workPrice.Active = false;
                                this.workPricekRepository.SaveChanges();
                            }

                            return true;
                        }
                        catch (Exception ex)
                        {
                            return false;
                            throw ex;
                        }

                    }

                }
                catch (Exception ex)
                {
                    return false;
                    throw ex;
                }
            }
            return false;
        }
    }
}