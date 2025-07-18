namespace GroceryListApi.DTOs
{
    public class LoginRequestDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class LoginResponseDto
    {
        public string? Message { get; set; }
        public int? UserId { get; set; }
    }
} 