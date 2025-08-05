using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Mvc;

namespace MBA.Marketplace.API.Controllers
{
    [ApiController]
    [Route("api/conta")]
    public class ContaController : ControllerBase
    {
        private readonly IVendedorRepository _vendedorRepository;
        private readonly IClienteRepository _clienteRepository;
        private readonly IAccountService _accountService;

        private string[] ErrorPassowrd = { "PasswordTooShort", "PasswordRequiresNonAlphanumeric", "PasswordRequiresLower", "PasswordRequiresUpper", "PasswordRequiresDigit" };
        private string[] ErrorEmail = { "DuplicateUserName" };

        public ContaController(
            IVendedorRepository vendedorRepository,
            IClienteRepository clienteRepository,
            IAccountService accountService)
        {
            _vendedorRepository = vendedorRepository;
            _clienteRepository = clienteRepository;
            _accountService = accountService;
        }

        [HttpPost("registrar-cliente")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterCliente([FromBody] RegistrarUsuarioDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Registra o usuário com a role de Cliente
            var (success, userId, errors) = await _accountService.RegisterUserWithRoleAsync(dto, TipoUsuario.Cliente);

            if (!success)
            {
                foreach (var error in errors)
                {
                    ModelState.AddModelError("Identity", error);
                }
                return BadRequest(ModelState);
            }

            // Cria o registro do cliente
            await _clienteRepository.CriarAsync(new Cliente
            {
                Id = userId.NormalizeGuid(),
                Nome = dto.Nome,
                Email = dto.Email,
                CreatedAt = DateTime.Now
            });

            //gera o token do usuário
            var dtoLogin = new LoginDto
            {
                Email = dto.Email,
                Senha = dto.Senha
            };

            var token = await _accountService.LoginAsync(dtoLogin);

            if (!token.Success)
            {
                return BadRequest(new { Errors = token.Errors });
            }

            return Ok(new { token = token.Token });
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, token, errors) = await _accountService.LoginAsync(dto);

            if (!success)
                return Unauthorized(new { Errors = errors });

            return Ok(new { token = token });
        }

        [HttpGet("roles/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserRoles(string userId)
        {
            var roles = await _accountService.GetUserRolesAsync(userId);

            if (!roles.Any())
                return NotFound(new { message = "Usuário não encontrado ou sem roles." });

            return Ok(new
            {
                UserId = userId,
                Roles = roles.Select(r => new
                {
                    Tipo = r.ToString(),
                    Descricao = r.GetDescription()
                })
            });
        }

        [HttpGet("verificar-role/{userId}/{tipoUsuario}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CheckUserRole(string userId, TipoUsuario tipoUsuario)
        {
            var hasRole = await _accountService.UserHasRoleAsync(userId, tipoUsuario);

            return Ok(new
            {
                UserId = userId,
                TipoUsuario = tipoUsuario.ToString(),
                Descricao = tipoUsuario.GetDescription(),
                HasRole = hasRole
            });
        }
    }
}
