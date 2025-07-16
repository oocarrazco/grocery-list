using Microsoft.EntityFrameworkCore;
using GroceryListApi.Models;

namespace GroceryListApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<GroceryList> GroceryLists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroceryList>()
                .HasMany(g => g.Items)
                .WithOne()
                .HasForeignKey(i => i.GroceryListId)
                .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);
        }
    }
}
