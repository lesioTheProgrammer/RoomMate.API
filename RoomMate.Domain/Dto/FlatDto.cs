namespace RoomMate.Domain.Dto
{
    public class FlatDto : BaseDto
    {
        public string FlatName { get; set; }

        public int? FlatAddressId { get; set; }

        public int? AddressId { get; set; }

        public int? FlatOwnerId { get; set; }

        public int RoomCount { get; set; }

        public int Area { get; set; }

        public UserListDto Users { get; set; }
    }
}
