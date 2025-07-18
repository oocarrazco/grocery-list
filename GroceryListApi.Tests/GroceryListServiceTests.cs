using GroceryListApi.Models;
using GroceryListApi.Repositories;
using GroceryListApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

public class GroceryListServiceTests
{
    private static AppDbContext CreateDb()
    {
        var opts = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(opts);
    }

    [Fact]
    public async Task DeleteList_NonExisting_ReturnsFalse()
    {
        using var db = CreateDb();
        var repo = new GroceryListRepository(db, NullLogger<GroceryListRepository>.Instance);
        var mapper = new AutoMapper.Mapper(new AutoMapper.MapperConfiguration(cfg => { }));
        var service = new GroceryListService(repo, mapper, NullLogger<GroceryListService>.Instance);

        var result = await service.DeleteList(99);

        Assert.False(result);
    }
} 