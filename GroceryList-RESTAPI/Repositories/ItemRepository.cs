using Microsoft.EntityFrameworkCore;
using GroceryListApi.Models;

namespace GroceryListApi.Repositories
{
    public class ItemRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ItemRepository> _logger;
        public ItemRepository(AppDbContext context, ILogger<ItemRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Item?> GetByIdAsync(int id)
        {
            _logger.LogInformation("GetByIdAsync called with id={Id}", id);
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                _logger.LogWarning("Item with id={Id} not found", id);
            }
            else
            {
                _logger.LogInformation("Item with id={Id} returned", id);
            }
            return item;
        }

        public async Task<Item> AddAsync(Item item)
        {
            _logger.LogInformation("AddAsync called");
            item.CreatedAt = DateTime.UtcNow;
            item.UpdatedAt = DateTime.UtcNow;
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Item added with id={Id}", item.Id);
            return item;
        }

        public async Task<Item?> UpdateAsync(Item item)
        {
            _logger.LogInformation("UpdateAsync called for id={Id}", item.Id);
            item.UpdatedAt = DateTime.UtcNow;
            _context.Items.Update(item);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Item with id={Id} updated", item.Id);
            return item;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            _logger.LogInformation("DeleteAsync called for id={Id}", id);
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                _logger.LogWarning("Delete failed: Item with id={Id} not found", id);
                return false;
            }
            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Item with id={Id} deleted", id);
            return true;
        }
    }
}
