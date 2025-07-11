using MBA.Marketplace.Business.Interfaces.Notifications;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Business.Notifications;
using MBA.Marketplace.Business.Services;
using MBA.Marketplace.Data.Context;
using MBA.Marketplace.Data.Repositories;

namespace MBA.Marketplace.MVC.Configurations
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
            service.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        private static void RegisterRepositories(IServiceCollection service)
        {
            service.AddScoped<ICategoriaRepository, CategoriaRepository>();
            service.AddScoped<IProdutoRepository, ProdutoRepository>();
            service.AddScoped<IVendedorRepository, VendedorRepository>();
        }

        private static void RegisterServices(IServiceCollection service)
        {
            service.AddScoped<ICategoriaService, CategoriaService>();
            service.AddScoped<IProdutoService, ProdutoService>();
            service.AddScoped<IVendedorService, VendedorService>();

        }
    }
}
