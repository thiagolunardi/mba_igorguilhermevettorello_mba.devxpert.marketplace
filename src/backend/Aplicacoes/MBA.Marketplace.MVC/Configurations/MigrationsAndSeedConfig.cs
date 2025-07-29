using MBA.Marketplace.Data.Data.Seeds;

namespace MBA.Marketplace.MVC.Configurations
{
    public static class MigrationsAndSeedConfig
    {
        public static void UseMigrationsAndSeedsConfig(this WebApplication app)
        {
            var services = app.Services.CreateScope().ServiceProvider;
            using var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
            string environmentName = env.EnvironmentName; 
            SeederAplicacao.SeedData(services, environmentName).Wait();
        }
    }
}
