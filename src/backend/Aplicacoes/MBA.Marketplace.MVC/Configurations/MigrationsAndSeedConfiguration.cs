using MBA.Marketplace.Data.Data.Seeds;

namespace MBA.Marketplace.MVC.Configurations
{
    public static class MigrationsAndSeedConfiguration
    {
        public static void UseMigrationsAndSeeds(this WebApplication app)
        {
            var services = app.Services.CreateScope().ServiceProvider;
            using var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
            string environmentName = env.EnvironmentName; 
            SeederAplicacao.SeedData(services, environmentName).Wait();
        }
    }
}
