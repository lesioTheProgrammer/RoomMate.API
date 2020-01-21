using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Repository
{
    public interface IEntity<TKey> : IIdentifiable<TKey> where TKey : IEquatable<TKey>
    {
    }
}
