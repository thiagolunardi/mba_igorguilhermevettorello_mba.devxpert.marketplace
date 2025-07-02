using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.MVC.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
