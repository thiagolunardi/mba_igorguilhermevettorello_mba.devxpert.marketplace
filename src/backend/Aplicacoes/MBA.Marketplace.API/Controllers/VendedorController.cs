using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.API.Controllers
{
    [ApiController]
    [Route("api/vendedores")]
    [AllowAnonymous]
    public class VendedorController : ControllerBase
    {
        private readonly IVendedorService _vendedorService;
        private readonly IProdutoService _produtoService;

        public VendedorController(
            IVendedorService vendedorService,
            ICategoriaRepository categoriaRepository,
            IProdutoService produtoService)
        {
            _vendedorService = vendedorService;
            _produtoService = produtoService;
        }

        [HttpGet("{id:guid}/produtos")]
        [ProducesResponseType(typeof(ListaPaginada<Produto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ObterProdutosDoVendedor([FromRoute] Guid id, [FromQuery] int numeroDaPagina = 1, [FromQuery] int tamanhoDaPagina = 10)
        {
            var parametros = new PesquisaDeProdutos()
            {
                VendedorId = id,
                NumeroDaPagina = numeroDaPagina,
                TamanhoDaPagina = tamanhoDaPagina
            };

            var produtosDoVendedor = await _produtoService.PesquisarAsync(parametros);
            return Ok(produtosDoVendedor);
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(Vendedor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ObterVendedorPorId(Guid id)
        {
            var vendedor = await _vendedorService.ObterVendedorAtivoPorIdAsync(id.ToString());

            if (vendedor == null)
                return NotFound();

            return Ok(vendedor);
        }

    }
}