using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Repository
{
    public interface IIdentifiable<TKey> where TKey : IEquatable<TKey>
    {
        TKey Id { get; set; }
    }
}
