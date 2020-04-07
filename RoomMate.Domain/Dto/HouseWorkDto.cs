using RoomMate.Database.Models.Enums;
using System;

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

        public string Login { get; set; }


    }
}
