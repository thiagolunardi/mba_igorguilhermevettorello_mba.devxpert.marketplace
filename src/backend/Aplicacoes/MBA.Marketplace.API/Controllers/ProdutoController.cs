using MBA.Marketplace.Business.DTOs.Paginacao;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.API.Controllers
{
    [ApiController]
    [Route("api/produtos")]
    [AllowAnonymous]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;
        private readonly IConfiguration _config;

        public ProdutoController(IProdutoService produtoService, IConfiguration config)
        {
            _produtoService = produtoService;
            _config = config;
        }

        private string GetContentType(string path)
        {
            var ext = Path.GetExtension(path).ToLowerInvariant();

            return ext switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };
        }

        [HttpGet("destaques")]
        [ProducesResponseType(typeof(IEnumerable<Produto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ObterItensEmDestaque([FromQuery] string? ordenarPor, [FromQuery] int? limit)
        {
            var produtos = await _produtoService.ObterItensEmDestaque(ordenarPor, limit);
            return Ok(produtos);
        }

        [HttpGet()]
        [ProducesResponseType(typeof(ListaPaginada<Produto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Pesquisar([FromQuery] PesquisaDeProdutos parametros)
        {
            var pesquisaPaginada = await _produtoService.PesquisarAsync(parametros);
            return Ok(pesquisaPaginada);
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(Produto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [AllowAnonymous]
        public async Task<IActionResult> ObterPorId(Guid id)
        {
            var produto = await _produtoService.ObterProdutoAtivoPorIdAsync(id);

            if (produto == null)
                return NotFound();

            return Ok(produto);
        }                
    }
}
