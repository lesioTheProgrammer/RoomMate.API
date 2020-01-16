namespace RoomMate.Domain.Dto
{
    public class AddressDto : BaseDto
    {
        public int CityId { get; set; }

        public string CityName { get; set; }

        public string Street { get; set; }

        public string HouseNumber { get; set; }

        public string FlatNumber { get; set; }

        public string AllAddress { get {
                return this.Street + " " + this.HouseNumber + "/" + this.FlatNumber;
            }
        }
    }
}