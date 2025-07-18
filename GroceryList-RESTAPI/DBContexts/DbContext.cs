using Microsoft.EntityFrameworkCore;
using GroceryListApi.Models;

namespace GroceryListApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<GroceryList> GroceryLists { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroceryList>()
                .HasMany(g => g.Items)
                .WithOne()
                .HasForeignKey(i => i.GroceryListId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GroceryList>()
                .HasOne(g => g.User)
                .WithMany(u => u.GroceryLists)
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seed default admin user (password: "admin")
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Username = "admin",
                // Hash generated using BCrypt.Net-Next at default work factor
                PasswordHash = "$2b$10$mryKnIe0LYdQmlS7F7KYbOYGe1bSWiAj3vnkPHwQWJ76qdjMETV0S"
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
