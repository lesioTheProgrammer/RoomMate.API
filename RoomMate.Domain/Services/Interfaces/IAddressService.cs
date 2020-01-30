using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using System.Collections.Generic;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IAddressService
    {
        List<CityDto> GetCitiesByName(string letters);

        IList<string> GetStreetsDistincted(int id, string streetLetters);

        AddressFlatDto GetAddressByFlatHouseNumb(AddressFlatDto addressDto);

        int GetCountOfFlats();
        AddressFlatDto GetFlatById(int flatId);

        List<Flat> GetUserFlat(int userId);

        bool AddFlatToUser(AddressFlatDto addressDto);

        bool LeaveFlat(AddressFlatDto addressDto);

        AddressFlatDto AddNewFlat(AddressFlatDto addressFlatDto);

        bool RemoveFlat(AddressFlatDto addressFlatDto);

    }
}
