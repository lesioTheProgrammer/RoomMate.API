using RoomMate.Database.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Database.Models
{
    public class Housework : BaseModel
    {
        public int FlatId { get; set; }

        public virtual Flat Flat { get; set; }

        public DateTime HouseWorkDate { get; set; }

        public string Description  { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public int? WorkPriceId { get; set; } = null;

        public virtual WorkPrice WorkPrice { get; set; }

        public virtual WorkTypeEnum WorkType { get; set; }
    }
}
