using RoomMate.Database.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoomMate.Database.Models
{
    [Table("RoleType")]
    public class RoleType : EnumBase<RoleTypeEnum>
    {
    }
}
