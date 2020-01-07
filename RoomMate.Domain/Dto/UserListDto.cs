using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Dto
{
    public class UserListDto
    {
        public int UserId { get; set; }

        public string Login { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }
    }
}
