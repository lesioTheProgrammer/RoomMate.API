using Microsoft.EntityFrameworkCore;
using RoomMate.Database.Models;

namespace RoomMate.Domain
{
    public class RoomMateContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=RoomMate;Trusted_Connection=True;");
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Flat> Flats { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Housework> Houseworks { get; set; }
        public DbSet<WorkPrice> WorkPrices { get; set; }
        public DbSet<WorkType> WorkTypes { get; set; }
    }
}
