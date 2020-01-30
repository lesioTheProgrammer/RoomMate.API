using RoomMate.Database.Models.Enums;

namespace RoomMate.Database.Models
{
    public class UserFlat : BaseModel
    {
        public int UserId { get; set; }

        public User User { get; set; }

        public Flat Flat { get; set; }

        public int FlatId { get; set; }

        public virtual RoleTypeEnum RoleType { get; set; }
    }
}
