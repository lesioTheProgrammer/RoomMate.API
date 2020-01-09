using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using System.Collections.Generic;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IRegisterService
    {
        bool RegisterUser(RegisterDto dto);
        bool IsUserTaken(string login, string email);
        User ConvertToTarget(RegisterDto registerDto);

        List<CityDto> GetCitiesByTwoLett(string letters);

        IList<AddressDto> GetAddrByCityID(int id, string streetLetters);
    }
}
