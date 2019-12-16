using RoomMate.Database.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Dto
{
    public class HouseWorkDto : BaseDto
    {
        public int FlatId { get; set; }

        public DateTime HouseWorkDate { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public string Username { get; set; }

        public WorkTypeEnum WorkType { get; set; }

        public double? Prices { get; set; }
    }
}
