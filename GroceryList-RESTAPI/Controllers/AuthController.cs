using Microsoft.AspNetCore.Mvc;
using GroceryListApi.Models;
using GroceryListApi.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace GroceryListApi.Controllers
{
    /// <summary>
    /// Handles user authentication and registration.
    /// </summary>
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

        /// <summary>
        /// Logs a user in with username and password.
        /// Returns 200 with userId when credentials are valid; otherwise 401.
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto loginDto)
        {
            _logger.LogInformation("Login attempt for user {Username}", loginDto.Username);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
            if (user == null)
            {
                _logger.LogWarning("User {Username} not found", loginDto.Username);
                return Unauthorized(new { message = "Invalid credentials" });
            }

            bool passwordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);
            if (!passwordValid)
            {
                _logger.LogWarning("Invalid password for user {Username}", loginDto.Username);
                return Unauthorized(new { message = "Invalid credentials" });
            }

            _logger.LogInformation("User {Username} logged in successfully", loginDto.Username);
            return Ok(new LoginResponseDto { Message = "Login successful", UserId = user.Id });
        }

        /// <summary>
        /// Registers a new user. Returns 409 when the username already exists.
        /// </summary>
        [HttpPost("register")]
        public async Task<ActionResult<LoginResponseDto>> Register([FromBody] LoginRequestDto registerDto)
        {
            _logger.LogInformation("Register attempt for user {Username}", registerDto.Username);

            if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
            {
                _logger.LogWarning("Username {Username} already exists", registerDto.Username);
                return Conflict(new { message = "Username already exists" });
            }

            var hashed = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);
            var newUser = new User { Username = registerDto.Username, PasswordHash = hashed };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            _logger.LogInformation("User {Username} registered successfully", registerDto.Username);

            return Ok(new LoginResponseDto { Message = "Registration successful", UserId = newUser.Id });
        }
    }
} 