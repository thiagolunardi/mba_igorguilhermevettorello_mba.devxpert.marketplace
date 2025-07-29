using AutoMapper;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.MVC.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MBA.Marketplace.MVC.Controllers
{
    [Route("vendedor")]
    [Authorize]
    public class VendedorController : Controller
    {
        private readonly ICategoriaService _categoriaService;
        private readonly IProdutoService _produtoService;
        private readonly IVendedorService _vendedorService;
        private readonly ILogger<VendedorController> _logger;
        private readonly IMapper _mapper;

        public VendedorController(IVendedorService vendedorSevice, ILogger<VendedorController> logger, IMapper mapper)
        {
            _vendedorService = vendedorSevice;
            _logger = logger;
            _mapper = mapper;
        }
        public async Task<IActionResult> Index()
        {
            var vendedor = await _vendedorService.ListarAsync();
            var model = _mapper.Map<List<VendedorViewModel>>(vendedor);
            return View(model);

        }
    }
    
}
