using RoomMate.Database.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RoomMate.Database.Models
{
    [Table("WorkType")]
    public class WorkType : EnumBase<WorkTypeEnum>
    {
    }
}
