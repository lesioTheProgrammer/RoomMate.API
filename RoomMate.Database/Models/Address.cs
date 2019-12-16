namespace RoomMate.Database.Models
{
    public class Address : BaseModel
    {
        public int CityId { get; set; }

        public string Street { get; set; }

        public string HouseNumber{ get; set; }

        public string FlatNumber { get; set; }

    }
}