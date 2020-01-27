using RoomMate.Domain.Dto;
using System.Collections.Generic;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IAddressService
    {
        List<CityDto> GetCitiesByName(string letters);

        IList<string> GetStreetsDistincted(int id, string streetLetters);

        AddressDto GetAddressByFlatHouseNumb(AddressDto addressDto);
    }
}
