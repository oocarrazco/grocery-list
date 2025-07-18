using GroceryListApi.Controllers;
using GroceryListApi.DTOs;
using GroceryListApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

public class AuthControllerTests
{
    private AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task Login_InvalidCredentials_ReturnsUnauthorized()
    {
        // Arrange
        using var context = CreateDbContext();
        // seed user with password "admin"
        context.Users.Add(new User
        {
            Id = 1,
            Username = "admin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin")
        });
        context.SaveChanges();

        var controller = new AuthController(context, NullLogger<AuthController>.Instance);
        var dto = new LoginRequestDto { Username = "admin", Password = "wrong" };

        // Act
        var result = await controller.Login(dto);

        // Assert
        Assert.IsType<UnauthorizedObjectResult>(result.Result);
    }
} 