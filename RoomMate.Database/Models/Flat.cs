using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Database.Models
{
    public class Flat : BaseModel
    {
        public string FlatName { get; set; }

        public int? FlatAddressId { get; set; }

        public int RoomCount { get; set; }

        public int Area { get; set; }

        public virtual Address FlatAddress { get; set; }

        public virtual ICollection<UserFlat> UserFlats { get; set; }
    }
}
