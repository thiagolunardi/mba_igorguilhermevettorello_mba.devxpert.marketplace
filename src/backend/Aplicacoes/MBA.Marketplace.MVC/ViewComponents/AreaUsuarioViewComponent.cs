using MBA.Marketplace.Business.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBA.Marketplace.MVC.ViewComponents
{
    public class AreaUsuarioViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var areaUsuario = new AreaUsuarioDto();

            if (!string.IsNullOrEmpty(userId))
            {
                areaUsuario.Logado = true;
                areaUsuario.Nome = string.Empty;
            }
            else
            {
                areaUsuario.Logado = false;
                areaUsuario.Nome = string.Empty;
            }

            return View(areaUsuario);
        }
    }
}
