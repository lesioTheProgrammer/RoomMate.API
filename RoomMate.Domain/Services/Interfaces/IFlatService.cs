using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IFlatService 
    {
        List<Flat> GetUserFlat(int userId);

        FlatDto GetFlatById(int flatId);

        int GetCountOfFlats();

    }
}
