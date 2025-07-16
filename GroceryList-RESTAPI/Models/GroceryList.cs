
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GroceryListApi.Models
{
    public class GroceryList
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public ICollection<GroceryListApi.Models.Item>? Items { get; set; }
    }
}
