using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace RoomMate.Database.Models.Enums
{
    public enum WorkTypeEnum
    {
        [Description("None work type")]
        None = 0,
        [Description("Cleaning")]
        Clean = 1,
        [Description("Shopping")]
        Shopping = 2,
    }
}
