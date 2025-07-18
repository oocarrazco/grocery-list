
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryListApi.Models
{
    public class GroceryList
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public ICollection<GroceryListApi.Models.Item>? Items { get; set; }
    }
}
