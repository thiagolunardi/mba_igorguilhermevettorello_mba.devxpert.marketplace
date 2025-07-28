using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Data.Context;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBA.Marketplace.MVC.ViewComponents
{
    public class AreaUsuarioViewComponent : ViewComponent
    {
        private readonly ApplicationDbContext _context;

        public AreaUsuarioViewComponent(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var areaUsuario = new AreaUsuarioDto();

            if (!string.IsNullOrEmpty(userId))
            {
                areaUsuario.Logado = true;
                areaUsuario.Email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value ?? "";
                areaUsuario.TipoUsuario = HttpContext.User.FindFirst("TipoUsuario")?.Value ?? "Cliente";
                
                // Buscar o nome do vendedor no banco de dados
                try
                {
                    if (Guid.TryParse(userId, out Guid parsedUserId))
                    {
                        var vendedor = await _context.Vendedores.FindAsync(parsedUserId);
                        if (vendedor != null && !string.IsNullOrEmpty(vendedor.Nome))
                        {
                            areaUsuario.Nome = vendedor.Nome;
                        }
                        else
                        {
                            // Fallback para o nome do usuário se não encontrar vendedor
                            areaUsuario.Nome = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value ?? "Usuário";
                        }
                    }
                    else
                    {
                        // Fallback se não conseguir fazer o parse do ID
                        areaUsuario.Nome = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value ?? "Usuário";
                    }
                }
                catch
                {
                    // Fallback em caso de erro
                    areaUsuario.Nome = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value ?? "Usuário";
                }
            }
            else
            {
                areaUsuario.Logado = false;
                areaUsuario.Nome = string.Empty;
                areaUsuario.Email = string.Empty;
                areaUsuario.TipoUsuario = string.Empty;
            }

            return View(areaUsuario);
        }
    }
}
