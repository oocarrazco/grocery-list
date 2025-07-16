using System.ComponentModel.DataAnnotations;

namespace GroceryListApi.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "This field is required")]
        [StringLength(128)]
        public string? Name { get; set; }
        public int? Quantity { get; set; }
        public bool? IsPurchased { get; set; }

        // Foreign key for GroceryList
        public int? GroceryListId { get; set; }
        // public GroceryList? GroceryList { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
