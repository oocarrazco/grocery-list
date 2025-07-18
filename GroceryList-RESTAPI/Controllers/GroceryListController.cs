
using Microsoft.AspNetCore.Mvc;
using GroceryListApi.Services;
using GroceryListApi.DTOs;

namespace GroceryListApi.Controllers
{
    /// <summary>
    /// REST endpoints for managing grocery lists (CRUD).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class GroceryListController : ControllerBase
    {
        private readonly GroceryListService _service;
        private readonly ILogger<GroceryListController> _logger;
        public GroceryListController(GroceryListService service, ILogger<GroceryListController> logger)
        {
            _service = service;
            _logger = logger;
        }


        /// <summary>
        /// Returns all grocery lists for the given user or every list when userId is null.
        /// </summary>
        /// <param name="userId">Optional user identifier to filter lists.</param>
        [HttpGet]
        public async Task<ActionResult<List<GroceryListDto>>> GetAll([FromQuery] int? userId)
        {
            _logger.LogInformation("GetAll called with userId={UserId}", userId);
            var lists = await _service.GetAllLists(userId);
            _logger.LogInformation("GetAll returned {Count} lists", lists.Count);
            return Ok(lists);
        }


        /// <summary>
        /// Returns a single grocery list by id.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<GroceryListDto>> GetById(int id)
        {
            _logger.LogInformation("GetById called with id={Id}", id);
            var list = await _service.GetListById(id);
            if (list == null) {
                _logger.LogWarning("GroceryList with id={Id} not found", id);
                return NotFound();
            }
            _logger.LogInformation("GroceryList with id={Id} returned", id);
            return Ok(list);
        }


        /// <summary>
        /// Creates a new grocery list.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<GroceryListDto>> Create([FromBody] GroceryListCreateDto dto)
        {
            _logger.LogInformation("Create called");
            var created = await _service.CreateList(dto);
            _logger.LogInformation("GroceryList created with id={Id}", created.Id);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }


        /// <summary>
        /// Updates an existing grocery list.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<GroceryListDto>> Update(int id, [FromBody] GroceryListUpdateDto dto)
        {
            _logger.LogInformation("Update called for id={Id}", id);
            var updated = await _service.UpdateList(id, dto);
            if (updated == null) {
                _logger.LogWarning("Update failed: GroceryList with id={Id} not found", id);
                return NotFound();
            }
            _logger.LogInformation("GroceryList with id={Id} updated", id);
            return Ok(updated);
        }

        /// <summary>
        /// Deletes a grocery list by id.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation("Delete called for id={Id}", id);
            var deleted = await _service.DeleteList(id);
            if (!deleted) {
                _logger.LogWarning("Delete failed: GroceryList with id={Id} not found", id);
                return NotFound();
            }
            _logger.LogInformation("GroceryList with id={Id} deleted", id);
            return NoContent();
        }
    }
}
