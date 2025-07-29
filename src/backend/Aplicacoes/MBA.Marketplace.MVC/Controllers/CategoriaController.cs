using AutoMapper;
using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.MVC.Extensions;
using MBA.Marketplace.MVC.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.MVC.Controllers
{
    [Route("categoria")]
    [Authorize]
    public class CategoriaController : Controller
    {
        private readonly ICategoriaService _categoriaService;
        private readonly ILogger<CategoriaController> _logger;
        private readonly IMapper _mapper;

        public CategoriaController(ICategoriaService categoriaService, ILogger<CategoriaController> logger, IMapper mapper)
        {
            _categoriaService = categoriaService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = $"{nameof(TipoUsuario.Vendedor)},{nameof(TipoUsuario.Administrador)}")]
        public async Task<IActionResult> Index()
        {
            try
            {
                var categorias = await _categoriaService.ListarAsync();
                var model = _mapper.Map<List<CategoriaViewModel>>(categorias);
                return View(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao listar categorias.");
                ViewBag.Erro = "Erro ao carregar categorias.";
                return View(new List<CategoriaViewModel>());
            }
        }

        [HttpGet("criar")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        public IActionResult Criar()
        {
            return View();
        }

        [HttpPost("criar")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Criar(CategoriaFormViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return View(model);

                var categoria = await _categoriaService.CriarAsync(new CategoriaDto
                {
                    Nome = model.Nome,
                    Descricao = model.Descricao
                });

                if (categoria != null)
                {
                    ViewBag.RegistroSucesso = true;
                    ModelState.Clear();
                    return View(new CategoriaFormViewModel());
                }
                else
                {
                    ViewBag.RegistroErro = true;
                    ModelState.AddModelError("", "Erro ao criar categoria.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar categoria.");
                ViewBag.RegistroErro = true;
                ModelState.AddModelError("", "Erro interno do servidor.");
            }

            return View(model);
        }

        [HttpGet("editar/{id:Guid}")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        public async Task<IActionResult> Editar(Guid id)
        {
            try
            {
                var categoria = await _categoriaService.ObterPorIdAsync(id);
                if (categoria == null)
                {
                    ViewBag.RegistroNaoEncontrado = true;
                    return View(new CategoriaFormViewModel());
                }

                var model = _mapper.Map<CategoriaFormViewModel>(categoria);
                return View(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao carregar categoria para edição.");
                ViewBag.Erro = "Erro ao carregar categoria.";
                return View(new CategoriaFormViewModel());
            }
        }

        [HttpPost("editar/{id:Guid}")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Editar(Guid id, CategoriaFormViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return View(model);

                var response = await _categoriaService.AtualizarAsync(id, new CategoriaDto
                {
                    Nome = model.Nome,
                    Descricao = model.Descricao
                });

                if (response)
                {
                    ViewBag.RegistroSucesso = true;
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("", "Categoria não encontrada.");
                    ViewBag.RegistroErro = true;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar categoria.");
                ViewBag.RegistroErro = true;
                ModelState.AddModelError("", "Erro interno do servidor.");
            }

            return View(model);
        }

        [HttpDelete("deletar/{id:Guid}")]
        [Authorize(Roles = nameof(TipoUsuario.Administrador))]
        public async Task<IActionResult> Deletar(Guid id)
        {
            try
            {
                var status = await _categoriaService.RemoverAsync(id);
                
                if (status == StatusRemocaoEnum.NaoEncontrado)
                    return NotFound();

                if (status == StatusRemocaoEnum.VinculacaoProduto)
                {
                    var mensagem = status.GetDescription();
                    return Conflict(new { mensagem });
                }

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao deletar categoria.");
                return StatusCode(500, new { mensagem = "Erro interno do servidor." });
            }
        }
    }
}
