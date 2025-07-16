using AutoMapper;
using GroceryListApi.Models;
using GroceryListApi.DTOs;

namespace GroceryListApi.Mapping
{
    public class GroceryListProfile : Profile
    {
        public GroceryListProfile()
        {
            CreateMap<GroceryListApi.Models.Item, GroceryListApi.DTOs.ItemDto>().ReverseMap();
            CreateMap<GroceryListApi.Models.GroceryList, GroceryListApi.DTOs.GroceryListDto>().ReverseMap();
            CreateMap<GroceryListApi.Models.GroceryList, GroceryListApi.DTOs.GroceryListCreateDto>().ReverseMap();
            CreateMap<GroceryListApi.Models.GroceryList, GroceryListApi.DTOs.GroceryListUpdateDto>().ReverseMap();
        }
    }
}
