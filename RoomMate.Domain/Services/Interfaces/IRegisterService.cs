﻿using RoomMate.Domain.Dto;
using System.Collections.Generic;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IRegisterService
    {
        bool RegisterUser(RegisterDto dto);
        bool IsUserTaken(string login, string email);

        List<CityDto> GetCitiesByName(string letters);

        IList<AddressDto> GetAddressByCityId(int id, string streetLetters);
    }
}
