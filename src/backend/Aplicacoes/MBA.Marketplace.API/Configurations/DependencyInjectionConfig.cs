using MBA.Marketplace.API.Extensions;
using MBA.Marketplace.Business.Interfaces.Identity;
using MBA.Marketplace.Business.Interfaces.Notifications;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Business.Notifications;
using MBA.Marketplace.Business.Services;
using MBA.Marketplace.Data.Context;
using MBA.Marketplace.Data.Repositories;
using Microsoft.AspNetCore.Identity;

namespace MBA.Marketplace.API.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection AddDependencyInjectionConfig(this IServiceCollection services, IConfiguration configuration)
        {
            RegisterApplicationDependencies(services, configuration);
            RegisterRepositories(services);
            RegisterServices(services);
            return services;
        }

        private static void RegisterApplicationDependencies(IServiceCollection service, IConfiguration configuration)
        {
            service.AddScoped<ApplicationDbContext>();
            service.AddScoped<INotificador, Notificador>();
            service.Configure<JwtSettings>(configuration.GetSection("Jwt"));
            service.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //service.AddScoped<IUser, AspNetUser>();
        }

        private static void RegisterRepositories(IServiceCollection service)
        {
            service.AddScoped<ICategoriaRepository, CategoriaRepository>();
            service.AddScoped<IProdutoRepository, ProdutoRepository>();
            service.AddScoped<IVendedorRepository, VendedorRepository>();
            service.AddScoped<IUserRepository<IdentityUser>, UserRepository>();
        }

        private static void RegisterServices(IServiceCollection service)
        {
            service.AddScoped<ICategoriaService, CategoriaService>();
            service.AddScoped<IProdutoService, ProdutoService>();
            service.AddScoped<IVendedorService, VendedorService>();
            service.AddScoped<IAccountService, AccountService>();

        }
    }
}
