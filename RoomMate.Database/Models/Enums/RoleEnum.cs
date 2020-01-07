using System.ComponentModel;


namespace RoomMate.Database.Models.Enums
{
    public enum RoleTypeEnum
    {
        Landlord = 0,
        Flatmate = 1,
        [Description("Flatmate Admin")]
        FlatMateAdmin = 2
    }
}
