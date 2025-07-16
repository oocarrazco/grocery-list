using Microsoft.EntityFrameworkCore;
using GroceryListApi.Models;

namespace GroceryListApi.Services
{
    public class ItemService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ItemService> _logger;
        public ItemService(AppDbContext context, ILogger<ItemService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Item>> GetAllItems()
        {
            _logger.LogInformation("GetAllItems called");
            var items = await _context.Items.ToListAsync();
            _logger.LogInformation("GetAllItems returned {Count} items", items.Count);
            return items;
        }

        public async Task<Item> GetItemById(int id)
        {
            _logger.LogInformation("GetItemById called with id={Id}", id);
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

        public async Task AddItem(Item item)
        {
            _logger.LogInformation("AddItem called");
            item.CreatedAt = DateTime.Now;
            item.UpdatedAt = DateTime.Now;
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Item added with id={Id}", item.Id);
        }

        public async Task<Item?> UpdateItem(int id, Item item)
        {
            _logger.LogInformation("UpdateItem called for id={Id}", id);
            var existingItem = await _context.Items.FindAsync(id);
            if (existingItem != null)
            {
                existingItem.Name = item.Name;
                existingItem.Quantity = item.Quantity;
                existingItem.IsPurchased = item.IsPurchased;
                existingItem.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Item with id={Id} updated", id);
            }
            else
            {
                _logger.LogWarning("Update failed: Item with id={Id} not found", id);
            }
            return existingItem;
        }

        public async Task DeleteItem(int id)
        {
            _logger.LogInformation("DeleteItem called for id={Id}", id);
            var item = await _context.Items.FindAsync(id);
            if (item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Item with id={Id} deleted", id);
            }
            else
            {
                _logger.LogWarning("Delete failed: Item with id={Id} not found", id);
            }
        }
    }
}
