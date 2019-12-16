using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Dto
{
    public class FlatDto : BaseDto
    {
        public string FlatName { get; set; }

        public int? FlatAddressId { get; set; }

        public int? FlatOwnerId { get; set; }

        public int RoomCount { get; set; }

        public int Area { get; set; }

        public AddressDto FlatAddress { get; set; }

    }
}
