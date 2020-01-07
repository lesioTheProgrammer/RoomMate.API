using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Database.Models
{
    public class Flat : BaseModel
    {
        public string FlatName { get; set; }

        public int? AddressId { get; set; }

        public int RoomCount { get; set; }

        public int Area { get; set; }

        public virtual Address Address { get; set; }

        public virtual ICollection<UserFlat> UserFlats { get; set; }
    }
}


