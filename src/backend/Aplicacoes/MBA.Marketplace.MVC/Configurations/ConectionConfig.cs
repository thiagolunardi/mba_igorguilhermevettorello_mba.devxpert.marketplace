using MBA.Marketplace.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace MBA.Marketplace.MVC.Configurations
{
    public static class ConectionConfig
    {
        public static IServiceCollection AddConectionConfig(this IServiceCollection services, IConfiguration configuration)
        {
            //if (builder.Environment.IsDevelopment())
            //{
            //    services.AddDbContext<ApplicationDbContext>(options =>
            //        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
            //}
            //else
            //{
            //    services.AddDbContext<ApplicationDbContext>(options =>
            //        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            //}

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}
