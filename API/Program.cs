using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
                      policy =>
                      {
                          //policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                          policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                      });
});


// add services to DI container
builder.Services.AddDbContext<DataContext>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//DataSeed should be Transient once all records are inserted operation is over 
builder.Services.AddTransient<DataSeed>();


var app = builder.Build();

// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dataContext.Database.Migrate();
    await DataSeed.SeedData(dataContext);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
