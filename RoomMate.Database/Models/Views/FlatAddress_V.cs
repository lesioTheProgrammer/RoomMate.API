using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Database.Models.Views
{
    public class FlatAddress_V
    {
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public int FlatNumber { get; set; }
        public string FlatName { get; set; }
        public int RoomCount { get; set; }
    }
}
