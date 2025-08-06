using AutoMapper;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;
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

        [HttpPost("ativar/{id:Guid}")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        public async Task<IActionResult> Ativar(Guid id)
        {
            return Ok();
            //try
            //{
            //    var status = await _categoriaService.RemoverAsync(id);

            //    if (status == StatusRemocaoEnum.NaoEncontrado)
            //        return NotFound();

            //    if (status == StatusRemocaoEnum.VinculacaoProduto)
            //    {
            //        var mensagem = status.GetDescription();
            //        return Conflict(new { mensagem });
            //    }

            //    return Ok();
            //}
            //catch (Exception ex)
            //{
            //    _logger.LogError(ex, "Erro ao deletar categoria.");
            //    return StatusCode(500, new { mensagem = "Erro interno do servidor." });
            //}
        }

        [HttpPost("inativar/{id:Guid}")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        public async Task<IActionResult> Inativar(Guid id)
        {
            return Ok();
            //try
            //{
            //    var status = await _categoriaService.RemoverAsync(id);

            //    if (status == StatusRemocaoEnum.NaoEncontrado)
            //        return NotFound();

            //    if (status == StatusRemocaoEnum.VinculacaoProduto)
            //    {
            //        var mensagem = status.GetDescription();
            //        return Conflict(new { mensagem });
            //    }

            //    return Ok();
            //}
            //catch (Exception ex)
            //{
            //    _logger.LogError(ex, "Erro ao deletar categoria.");
            //    return StatusCode(500, new { mensagem = "Erro interno do servidor." });
            //}
        }
    }
}
