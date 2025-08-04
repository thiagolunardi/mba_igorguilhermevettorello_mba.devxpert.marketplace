using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Data.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MBA.Marketplace.Data.Data.Seeds
{
    public static class SeederAplicacao
    {
        public static async Task SeedData(IServiceProvider serviceProvider, string env)
        {
            await EnsureSeedData(serviceProvider, env);
        }

        public static async Task EnsureSeedData(IServiceProvider serviceProvider, string env)
        {
            using var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var contextIdentity = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

            if (env.Equals("Development") || env.Equals("Docker") || env.Equals("Staging"))
            {
                await context.Database.MigrateAsync();
                await contextIdentity.Database.MigrateAsync();

                await EnsureSeedRoles(contextIdentity);
                await EnsureSeedApplication(userManager, context, contextIdentity);
            }
        }

        private static async Task EnsureSeedRoles(IdentityDbContext contextIdentity)
        {
            // Verifica se já existem roles criadas
            if (contextIdentity.Roles.Any())
                return;

            // Obtém todos os valores do enum TipoUsuario
            var tiposUsuario = Enum.GetValues(typeof(TipoUsuario)).Cast<TipoUsuario>();

            foreach (var tipoUsuario in tiposUsuario)
            {
                var roleName = tipoUsuario.GetDescription();
                var normalizedRoleName = roleName.ToUpperInvariant();
                if (!contextIdentity.Roles.Any(r => r.NormalizedName == normalizedRoleName))
                {
                    await contextIdentity.Roles.AddAsync(new IdentityRole
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = roleName,
                        NormalizedName = normalizedRoleName,
                        ConcurrencyStamp = Guid.NewGuid().ToString()
                    });
                }
            }

            await contextIdentity.SaveChangesAsync();
        }

        private static async Task EnsureSeedApplication(UserManager<IdentityUser> userManager, ApplicationDbContext context, IdentityDbContext contextIdentity)
        {
            var emailAdmin = "administrador@marketplace.com.br";
            if (await userManager.FindByEmailAsync(emailAdmin) == null)
            {
                var user = new IdentityUser
                {
                    UserName = "Administrador",
                    Email = emailAdmin,
                    NormalizedUserName = "Administrador",
                    NormalizedEmail = emailAdmin,
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = true,
                    AccessFailedCount = 0
                };

                var result = await userManager.CreateAsync(user, "Admin@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, TipoUsuario.Administrador.ToString().ToUpper());
                }

                await contextIdentity.SaveChangesAsync();
            }

            var vendedorNome = "Vendedor";
            var vendedorEmail = "vendedor@marketplace.com.br";
            var vendedorId = Guid.NewGuid();
            if (await userManager.FindByEmailAsync(vendedorEmail) == null)
            {
                var vendedorSistema = new IdentityUser
                {
                    Id = vendedorId.ToString(),
                    UserName = vendedorNome,
                    NormalizedUserName = vendedorNome,
                    Email = vendedorEmail,
                    NormalizedEmail = vendedorEmail,
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = true,
                    AccessFailedCount = 0
                };

                var result = await userManager.CreateAsync(vendedorSistema, "Vendedor@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(vendedorSistema, TipoUsuario.Vendedor.ToString().ToUpper());
                }

                await contextIdentity.SaveChangesAsync();


                await context.Vendedores.AddAsync(new Vendedor
                {
                    Id = vendedorId,
                    Nome = vendedorNome,
                    Email = vendedorEmail,
                    CreatedAt = DateTime.UtcNow
                });
            }

            var clienteNome = "Cliente";
            var clienteEmail = "cliente@cliente.com.br";
            var clienteId = Guid.NewGuid();
            if (await userManager.FindByEmailAsync(clienteEmail) == null)
            {
                var clienteSistema = new IdentityUser
                {
                    Id = clienteId.ToString(),
                    UserName = clienteNome,
                    NormalizedUserName = clienteNome,
                    Email = clienteEmail,
                    NormalizedEmail = clienteEmail,
                    EmailConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = true,
                    AccessFailedCount = 0
                };

                var result = await userManager.CreateAsync(clienteSistema, "Cliente@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(clienteSistema, TipoUsuario.Cliente.ToString().ToUpper());
                }

                await contextIdentity.SaveChangesAsync();


                await context.Clientes.AddAsync(new Cliente
                {
                    Id = clienteId,
                    Nome = clienteNome,
                    Email = clienteEmail,
                    CreatedAt = DateTime.UtcNow
                });
            }

            Guid eletronicoId = Guid.NewGuid();
            Guid roupaId = Guid.NewGuid();
            Guid livroId = Guid.NewGuid();
            if (!context.Categorias.Any())
            {
                context.Categorias.AddRange(
                    new Categoria { Id = eletronicoId, Nome = "Eletrônicos", Descricao = "Eletrônicos em geral", CreatedAt = DateTime.Now },
                    new Categoria { Id = roupaId, Nome = "Roupas", Descricao = "Roupas em geral", CreatedAt = DateTime.Now },
                    new Categoria { Id = livroId, Nome = "Livros", Descricao = "Livros em geral", CreatedAt = DateTime.Now }
                );
            }

            if (!context.Produtos.Any())
            {
                var agora = DateTime.Now;
                context.Produtos.AddRange(SeederProdutos.CriarProdutos(eletronicoId, roupaId, vendedorId, livroId, agora));
            }

            await context.SaveChangesAsync();
        }
    }
}
