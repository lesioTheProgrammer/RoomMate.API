using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Database.Models
{
    public class Notes : BaseModel
    {
        public string Content { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int FlatId { get; set; }

        public virtual Flat Flat { get; set; }

    }
}
