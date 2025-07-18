using Microsoft.EntityFrameworkCore;
using GroceryListApi.Models;

namespace GroceryListApi.Repositories
{
    public class GroceryListRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<GroceryListRepository> _logger;
        public GroceryListRepository(AppDbContext context, ILogger<GroceryListRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<GroceryList>> GetAllAsync(int? userId = null)
        {
            _logger.LogInformation("GetAllAsync called");
            IQueryable<GroceryList> query = _context.GroceryLists.Include(l => l.Items);
            if (userId.HasValue)
            {
                query = query.Where(l => l.UserId == userId.Value);
            }
            var lists = await query.ToListAsync();
            _logger.LogInformation("GetAllAsync returned {Count} lists", lists.Count);
        return lists.Cast<GroceryList>().ToList();
        }

        public async Task<GroceryList?> GetByIdAsync(int id)
        {
            _logger.LogInformation("GetByIdAsync called with id={Id}", id);
            var list = await _context.GroceryLists.Include(l => l.Items).FirstOrDefaultAsync(l => l.Id == id);
            if (list == null)
            {
                _logger.LogWarning("GroceryList with id={Id} not found", id);
            }
            else
            {
                _logger.LogInformation("GroceryList with id={Id} returned", id);
            }
        return list is GroceryList gList ? gList : null;
        }

        public async Task<GroceryList> AddAsync(GroceryList list)
        {
            _logger.LogInformation("AddAsync called");
        var newList = new GroceryList { Name = list.Name, UserId = list.UserId };
            _context.GroceryLists.Add(newList);
            await _context.SaveChangesAsync();
            _logger.LogInformation("GroceryList added with id={Id}", newList.Id);
        return newList as GroceryList;
        }

        public async Task<GroceryList?> UpdateAsync(GroceryList list)
        {
            _logger.LogInformation("UpdateAsync called for id={Id}", list.Id);
            var existing = await _context.GroceryLists.FindAsync(list.Id);
            if (existing != null)
            {
                existing.Name = list.Name;
                await _context.SaveChangesAsync();
                _logger.LogInformation("GroceryList with id={Id} updated", list.Id);
            }
        return existing is GroceryList gList ? gList : null;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            _logger.LogInformation("DeleteAsync called for id={Id}", id);
            var list = await _context.GroceryLists.FindAsync(id);
            if (list == null)
            {
                _logger.LogWarning("Delete failed: GroceryList with id={Id} not found", id);
                return false;
            }
            _context.GroceryLists.Remove(list);
            await _context.SaveChangesAsync();
            _logger.LogInformation("GroceryList with id={Id} deleted", id);
            return true;
        }
    }
}
