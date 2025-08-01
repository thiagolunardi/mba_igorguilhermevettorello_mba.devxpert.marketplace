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

        private readonly IVendedorRepository _vendedorRepository;
        private readonly IProdutoService _produtoService;
        private readonly IConfiguration _config;

        public VendedorController(
            IVendedorRepository vendedorRepository,
            ICategoriaRepository categoriaRepository,
            IProdutoService produtoService,
            IConfiguration config)
        {
            _vendedorRepository = vendedorRepository;
            _produtoService = produtoService;
            _config = config;
        }

        [HttpGet("{id:guid}/produtos")]
        [ProducesResponseType(typeof(ListaPaginada<Produto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ObterProdutosDoVendedor(Guid id)
        {
            var parametros = new PesquisaDeProdutos()
            {
                VendedorId = id
            };

            var produtosDoVendedor = await _produtoService.PesquisarAsync(parametros);
            return Ok(produtosDoVendedor);
        }
    }
}
