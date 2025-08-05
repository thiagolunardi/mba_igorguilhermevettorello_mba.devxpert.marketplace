using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.Enums;
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

        public async Task<IViewComponentResult> InvokeAsync(bool mostrarTipoUsuario)
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var areaUsuario = new AreaUsuarioDto();
            areaUsuario.MostrarTipoUsuario = mostrarTipoUsuario;

            if (!string.IsNullOrEmpty(userId))
            {
                areaUsuario.Logado = true;
                var isAdmin = HttpContext.User.FindFirst(ClaimTypes.Role)?.Value == TipoUsuario.Administrador.ToString();
                var isVendedor = HttpContext.User.FindFirst(ClaimTypes.Role)?.Value == TipoUsuario.Vendedor.ToString();
                areaUsuario.Email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value ?? "";
                areaUsuario.TipoUsuario = TipoUsuario.Vendedor.ToString();
                if (isAdmin)
                {
                    areaUsuario.TipoUsuario = TipoUsuario.Administrador.ToString();
                }
                
                try
                {
                    if (Guid.TryParse(userId, out Guid parsedUserId))
                    {
                        var vendedor = await _context.Vendedores.FindAsync(parsedUserId);
                        if (isVendedor && vendedor != null && !string.IsNullOrEmpty(vendedor.Nome))
                        {
                            areaUsuario.Nome = vendedor.Nome;
                        }
                        else
                        {
                            areaUsuario.Nome = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value ?? "Usuário";
                        }
                    }
                    else
                    {
                        areaUsuario.Nome = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value ?? "Usuário";
                    }
                }
                catch
                {
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
