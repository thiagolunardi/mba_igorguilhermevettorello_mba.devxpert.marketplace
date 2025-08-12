using MBA.Marketplace.MVC.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace MBA.DevXpert.Marketplace.MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(Guid? categoriaId, string? descricao)
        {
            // Verifica se o usuário está autenticado
            if (User.Identity.IsAuthenticated)
            {
                // Redireciona para a área administrativa se estiver logado
                return Redirect("/admin");
            }

            // Se não estiver logado, redireciona para o login
            return Redirect("/Identity/Account/Login");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
