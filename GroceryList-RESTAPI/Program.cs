
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using GroceryListApi.Models;
using GroceryListApi.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<GroceryListApi.Repositories.GroceryListRepository>();
builder.Services.AddScoped<GroceryListApi.Repositories.ItemRepository>();

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()
    )
);
builder.Services.AddScoped<ItemService>(); // Register ItemService
builder.Services.AddScoped<GroceryListApi.Services.GroceryListService>(); // Register GroceryListService
builder.Services.AddControllers();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate(); // Applies pending migrations at startup
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS policy
app.UseCors("AllowAngularApp");

app.MapControllers();

app.Run();