using System.Diagnostics;
using AutoMapper;
using MBA.DevXpert.Marketplace.MVC.Models;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.MVC.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MBA.DevXpert.Marketplace.MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ICategoriaService _categoriaService;
        private readonly IProdutoService _produtoService;
        private readonly IMapper _mapper;

        public HomeController(ILogger<HomeController> logger, ICategoriaService categoriaService, IProdutoService produtoService, IMapper mapper)
        {
            _logger = logger;
            _categoriaService = categoriaService;
            _produtoService = produtoService;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index(Guid? categoriaId, string? descricao)
        {
            ViewBag.Categorias = await _categoriaService.ListarAsync();
            var produtos = await _produtoService.ListarProdutosPorCategoriaOuNomeDescricaoAsync(categoriaId, descricao);
            var model = _mapper.Map<List<ProdutoViewModel>>(produtos);
            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
