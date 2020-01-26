using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Repository
{
    public class Entity<TKey> : IEntity<TKey> where TKey : IEquatable<TKey>
    {
        public virtual TKey Id { get; set; }
    }
}
