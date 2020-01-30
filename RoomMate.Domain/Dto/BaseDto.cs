using System;

namespace RoomMate.Domain.Dto
{
    public class BaseDto
    {
        public int Id { get; set; }

        public bool Active { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? ModificatedBy { get; set; } 

        public DateTime ModificatedDate { get; set; }

        public  bool IsValidId(int? id)
        {
            if (id == 0 || id == null)
            {
                return false;
            }
            return true;
        }
        public static bool IsEmpty(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return false;
            }
            return true;
        }

        public bool IsActive()
        {
            return this.Active;
        }
    }
}
