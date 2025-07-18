using GroceryListApi.Models;

using AutoMapper;
using GroceryListApi.DTOs;
using GroceryListApi.Repositories;

namespace GroceryListApi.Services
{
    public class GroceryListService
    {
        private readonly GroceryListRepository _listRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<GroceryListService> _logger;
        public GroceryListService(GroceryListRepository listRepo, IMapper mapper, ILogger<GroceryListService> logger)
        {
            _listRepo = listRepo;
            _mapper = mapper;
            _logger = logger;
        }


        public async Task<List<GroceryListDto>> GetAllLists(int? userId = null)
        {
            _logger.LogInformation("GetAllLists called with userId={UserId}", userId);
            var lists = await _listRepo.GetAllAsync(userId);
            _logger.LogInformation("GetAllLists returned {Count} lists", lists.Count);
            return _mapper.Map<List<GroceryListDto>>(lists);
        }


        public async Task<GroceryListDto?> GetListById(int id)
        {
            _logger.LogInformation("GetListById called with id={Id}", id);
            var list = await _listRepo.GetByIdAsync(id);
            if (list == null)
            {
                _logger.LogWarning("GroceryList with id={Id} not found", id);
                return null;
            }
            _logger.LogInformation("GroceryList with id={Id} returned", id);
            return _mapper.Map<GroceryListDto>(list);
        }


        public async Task<GroceryListDto> CreateList(GroceryListCreateDto dto)
        {
            _logger.LogInformation("CreateList called");
            var entity = _mapper.Map<GroceryList>(dto);
            var created = await _listRepo.AddAsync(entity);
            _logger.LogInformation("GroceryList created with id={Id}", created.Id);
            return _mapper.Map<GroceryListDto>(created);
        }


        public async Task<bool> DeleteList(int id)
        {
            _logger.LogInformation("DeleteList called for id={Id}", id);
            var deleted = await _listRepo.DeleteAsync(id);
            if (!deleted)
            {
                _logger.LogWarning("Delete failed: GroceryList with id={Id} not found", id);
            }
            else
            {
                _logger.LogInformation("GroceryList with id={Id} deleted", id);
            }
            return deleted;
        }


        public async Task<GroceryListDto?> UpdateList(int id, GroceryListUpdateDto dto)
        {
            _logger.LogInformation("UpdateList called for id={Id}", id);
            var existing = await _listRepo.GetByIdAsync(id);
            if (existing == null) return null;
            existing.Name = dto.Name;
            var updated = await _listRepo.UpdateAsync(existing);
            return _mapper.Map<GroceryListDto>(updated);
        }
    }
}
