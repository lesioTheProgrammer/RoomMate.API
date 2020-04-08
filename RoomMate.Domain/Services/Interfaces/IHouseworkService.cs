using RoomMate.Database.Models;
using RoomMate.Database.Models.Enums;
using RoomMate.Domain.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IHouseworkService
    {
        List<HouseWorkDto> GetHouseWorkListForFlat(int flatId, WorkTypeEnum workType);

        List<HouseWorkDto> GetHouseWorkListForUser(int userId);

        bool AddNewHouseWork(HouseWorkDto houseWorkDto);

        HouseWorkDto ConverterToDto(Housework houseWork);

        Housework ConverterToTarget(HouseWorkDto houseWork);

        HouseWorkDto EditHouseWork(HouseWorkDto houseWorkDto);
    }
}
