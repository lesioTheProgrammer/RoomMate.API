using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using System.Collections.Generic;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IFlatService 
    {
        List<Flat> GetUserFlat(int userId);

        FlatDto GetFlatById(int flatId);

        int GetCountOfFlats();

        bool AddFlatToUser(AddressDto addressDto);

        bool LeaveFlat(AddressDto addressDto);

    }
}
