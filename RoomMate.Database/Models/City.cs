using System.Collections.Generic;

namespace RoomMate.Database.Models
{
    public class City : BaseModel
    {
        public string CityName { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
    }
}
