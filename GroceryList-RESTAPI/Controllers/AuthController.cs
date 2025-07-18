using Microsoft.AspNetCore.Mvc;
using GroceryListApi.Models;
using GroceryListApi.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace GroceryListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AppDbContext context, ILogger<AuthController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto loginDto)
        {
            _logger.LogInformation("Login attempt for user {Username}", loginDto.Username);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
            if (user == null)
            {
                _logger.LogWarning("User {Username} not found", loginDto.Username);
                return Unauthorized(new LoginResponseDto { Success = false, Message = "Invalid credentials" });
            }

            bool passwordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);
            if (!passwordValid)
            {
                _logger.LogWarning("Invalid password for user {Username}", loginDto.Username);
                return Unauthorized(new LoginResponseDto { Success = false, Message = "Invalid credentials" });
            }

            _logger.LogInformation("User {Username} logged in successfully", loginDto.Username);
            return Ok(new LoginResponseDto { Success = true, Message = "Login successful" });
        }
    }
} 