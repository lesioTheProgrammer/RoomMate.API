using RoomMate.Database.Models.Enums;
using System.Collections.Generic;

namespace RoomMate.Database.Models
{
    public class User : BaseModel
    {
        public string Login { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Code { get; set; }

        public string PasswordSalt { get; set; }

        public virtual ICollection<UserFlat> UserFlats { get; set; }

        public virtual RoleTypeEnum RoleType { get; set; }

        public virtual ICollection<Notes> Notes { get; set; }
    }
}