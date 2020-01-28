using System.Collections.Generic;

namespace RoomMate.Domain.Dto
{
    public class AddressDto : BaseDto
    {
        public int CityId { get; set; }

        public string CityName { get; set; }

        public string Street { get; set; }

        public string HouseNumber { get; set; }

        public string FlatNumber { get; set; }

        public string FlatName { get; set; }

        public int RoomCount { get; set; }

        public string LoggedUserName { get; set; }

        public ICollection<UserListDto> Users { get; set; }

        public bool IsValid()
        {
            return (IsEmpty(this.Street) && IsEmpty(this.HouseNumber)
                && IsEmpty(this.FlatNumber)
                 && IsValidId(this.CityId));
        }

        public bool DoesFlatExist()
        {
            return (IsEmpty(this.LoggedUserName) && IsValidId(this.Id));
        }
    }
}