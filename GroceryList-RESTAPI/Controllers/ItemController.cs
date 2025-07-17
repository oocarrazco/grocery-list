using GroceryListApi.Models;
using GroceryListApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GroceryListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ILogger<ItemController> _logger;
        private readonly ItemService _itemService;
        public ItemController(ItemService itemService, ILogger<ItemController> logger)
        {
            _itemService = itemService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetAllItems()
        {
            _logger.LogInformation("GetAllItems called");
            var items = await _itemService.GetAllItems();
            _logger.LogInformation("GetAllItems returned {Count} items", items.Count);
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItemById(int id)
        {
            _logger.LogInformation("GetItemById called with id={Id}", id);
            var item = await _itemService.GetItemById(id);
            if (item == null) {
                _logger.LogWarning("Item with id={Id} not found", id);
                return NotFound();
            }
            _logger.LogInformation("Item with id={Id} returned", id);
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult> CreateItem([FromBody] Item item)
        {
            _logger.LogInformation("CreateItem called");
            await _itemService.AddItem(item);
            _logger.LogInformation("Item created with id={Id}", item.Id);
            return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItem(int id, [FromBody] Item item)
        {
            _logger.LogInformation("UpdateItem called for id={Id}", id);
            var updatedItem = await _itemService.UpdateItem(id, item);
            if (updatedItem == null)
            {
                _logger.LogWarning("Update failed: Item with id={Id} not found", id);
                return NotFound();
            }
            _logger.LogInformation("Item with id={Id} updated", id);
            return Ok(new { id = updatedItem.Id, item = updatedItem });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            _logger.LogInformation("DeleteItem called for id={Id}", id);
            var existingItem = await _itemService.GetItemById(id);
            if (existingItem == null)
            {
                _logger.LogWarning("Delete failed: Item with id={Id} not found", id);
                return NotFound();
            }
            await _itemService.DeleteItem(id);
            _logger.LogInformation("Item with id={Id} deleted", id);
            return NoContent();
        }

        [HttpPatch("{id}/toggle-purchase")]
        public async Task<ActionResult> TogglePurchaseStatus(int id, [FromBody] TogglePurchaseRequest request)
        {
            _logger.LogInformation("TogglePurchaseStatus called for id={Id}", id);
            var existingItem = await _itemService.GetItemById(id);
            if (existingItem == null)
            {
                _logger.LogWarning("TogglePurchaseStatus failed: Item with id={Id} not found", id);
                return NotFound();
            }
            existingItem.IsPurchased = request.IsPurchased;
            await _itemService.UpdateItem(id, existingItem);
            _logger.LogInformation("Item with id={Id} purchase status updated to {IsPurchased}", id, existingItem.IsPurchased);
            return Ok(existingItem);
        }

        // ...existing code...
    }
}
