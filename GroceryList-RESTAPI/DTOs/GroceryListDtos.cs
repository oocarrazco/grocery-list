namespace GroceryListApi.DTOs
{
    public class ItemDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Quantity { get; set; }
        public bool IsPurchased { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class GroceryListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public required List<ItemDto> Items { get; set; }
    }

    public class GroceryListCreateDto
    {
        public required string Name { get; set; }
    }

    public class GroceryListUpdateDto
    {
        public required string Name { get; set; }
    }
}
