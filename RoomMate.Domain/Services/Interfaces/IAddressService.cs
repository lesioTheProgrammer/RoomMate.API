using RoomMate.Domain.Dto;
using System.Collections.Generic;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IAddressService
    {
        List<CityDto> GetCitiesByName(string letters);

        IList<string> GetStreetsDistincted(int id, string streetLetters);
        bool AddAddressUserSelected(AddressDto address, int idOfJustCreatedUser);

        AddressDto GetAddressByFlatHouseNumb(AddressDto addressDto);
    }
}
