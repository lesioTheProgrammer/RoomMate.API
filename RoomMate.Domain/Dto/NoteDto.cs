using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Dto
{
    public class NoteDto : BaseDto
    {
        public string Content { get; set; }

        public int UserId { get; set; }

        public int FlatId { get; set; }

        public string UserName { get; set; } = "";
    }
}
