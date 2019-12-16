using System;

namespace RoomMate.Domain.Dto
{
    public class BaseDto
    {
        public int Id { get; set; }

        public bool Active { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public int ModificatedBy { get; set; }

        public DateTime ModificatedDate { get; set; }

    }
}
