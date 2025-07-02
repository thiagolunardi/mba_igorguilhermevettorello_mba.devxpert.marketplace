using MBA.Marketplace.API.Configurations;
using MBA.Marketplace.Data.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddConectionConfig(builder.Configuration);
builder.Services.AddDependencyInjectionConfig(builder.Configuration);
builder.Services.AddIdentityConfig(builder.Configuration);
builder.Services.AddAuthConfig(builder.Configuration);
builder.Services.AddSwaggerConfig();
builder.Services.AddApiConfig(builder.Configuration);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddLoggingConfig(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var appDbContext = services.GetRequiredService<ApplicationDbContext>();
    appDbContext.Database.Migrate();

    var identityDbContext = services.GetRequiredService<IdentityDbContext>();
    identityDbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
