using AutoMapper;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.MVC.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.MVC.Controllers
{
    [Route("vendedor")]
    [Authorize]
    public class VendedorController : Controller
    {
        private readonly IVendedorService _vendedorService;
        private readonly IProdutoService _produtoService;
        private readonly ILogger<VendedorController> _logger;
        private readonly IMapper _mapper;

        public VendedorController(IVendedorService vendedorSevice, 
            IProdutoService produtoService,
            ILogger<VendedorController> logger, IMapper mapper)
        {
            _vendedorService = vendedorSevice;
            _produtoService = produtoService;
            _logger = logger;
            _mapper = mapper;
        }
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        public async Task<IActionResult> Index()
        {
            var vendedor = await _vendedorService.ListarAsync();
            var model = _mapper.Map<List<VendedorViewModel>>(vendedor);
            return View(model);
        }

        [HttpPost("trocar-status/{id:Guid}")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        public async Task<IActionResult> TrocarStatus(Guid id)
        {
            var vendedor = await _vendedorService.ChangeState(id);

            if (vendedor == null)
                return NotFound();

            _ = await _produtoService.ChangeStatePorVendedor(vendedor);

            return Ok();
        }
    }
}
