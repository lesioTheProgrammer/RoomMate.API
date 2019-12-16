using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Database.Models
{
    public class WorkPrice : BaseModel
    {
        public WorkPrice()
        {
            this.Active = true;
            this.ModificatedDate = DateTime.Now;
            this.CreatedDate = DateTime.Now;
        }

        public double Prices { get; set; }

        public virtual Housework Housework {get;set;}

    }
}
