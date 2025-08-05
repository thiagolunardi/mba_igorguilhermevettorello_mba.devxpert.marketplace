using AutoMapper;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.MVC.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MBA.Marketplace.MVC.Controllers
{
    [Route("admin")]
    [Authorize]
    public class AdminController : Controller
    {
        private readonly ICategoriaService _categoriaService;
        private readonly IProdutoService _produtoService;
        private readonly IVendedorService _vendedorService;
        private readonly ILogger<AdminController> _logger;
        private readonly IMapper _mapper;

        public AdminController(ICategoriaService categoriaService,IProdutoService produtoService, IVendedorService vendedorSevice, ILogger<AdminController> logger, IMapper mapper)
        {
            _categoriaService = categoriaService;
            _produtoService = produtoService;
            _vendedorService = vendedorSevice;
            _logger = logger;
            _mapper = mapper;
        }
        public async Task<IActionResult> Index()
        {
            var model = new AdminDashboardViewModel
            {
                TotalCategoria = (await _categoriaService.ListarAsync()).Count(),
                TotalProdutos = (await _produtoService.ListarAllAsync()).Count(),
                TotalVendedores = (await _vendedorService.ListarAsync()).Count(),
            };

            return View(model);
        }
    }
    
}
