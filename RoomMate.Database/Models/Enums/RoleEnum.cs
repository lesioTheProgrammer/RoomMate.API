using System.ComponentModel;


namespace RoomMate.Database.Models.Enums
{
    public enum RoleTypeEnum
    {
        Flatmate = 0,
        [Description("Flatmate Admin")]
        FlatMateAdmin = 1
    }
}
