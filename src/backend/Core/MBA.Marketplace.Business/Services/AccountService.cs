using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;
using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Interfaces.Services;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace MBA.Marketplace.Business.Services
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository<IdentityUser> _userRepository;
        private readonly IClienteRepository _clienteRepository;

        private readonly UserManager<IdentityUser> _userManager;

        public AccountService(UserManager<IdentityUser> userManager, IConfiguration configuration, IUserRepository<IdentityUser> userRepository, IClienteRepository clienteRepository)
        {
            _userManager = userManager;
            _configuration = configuration;
            _userRepository = userRepository;
            _clienteRepository = clienteRepository;
        }

        public async Task<(bool Success, string Token, IEnumerable<string> Errors)> LoginAsync(LoginDto dto)
        {
            var usuario = await _userRepository.FindByEmailAsync(dto.Email);
            var checkPassword = await _userRepository.CheckPasswordAsync(usuario, dto.Senha);
            if (usuario == null || !checkPassword)
            {
                return (false, null, new[] { "E-mail ou senha inválidos." });
            }

            var cliente = await _clienteRepository.ObterPorUsuarioIdAsync(usuario.Id);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Name, cliente?.Nome?? usuario.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:ExpiresInMinutes"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return (true, tokenString, Array.Empty<string>());
        }

        /// <summary>
        /// Registra um novo usuário com uma role específica baseada no enum TipoUsuario
        /// </summary>
        /// <param name="dto">Dados do usuário a ser registrado</param>
        /// <param name="tipoUsuario">Tipo de usuário baseado no enum</param>
        /// <returns>Resultado da operação</returns>
        public async Task<(bool Success, string UserId, IEnumerable<string> Errors)> RegisterUserWithRoleAsync(RegistrarUsuarioDto dto, TipoUsuario tipoUsuario)
        {
            var user = new IdentityUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, dto.Senha);
            if (!result.Succeeded)
            {
                return (false, null, result.Errors.Select(e => e.Description));
            }

            // Atribui a role baseada no enum TipoUsuario
            var roleAssigned = await _userManager.AssignRoleByTipoUsuarioAsync(user, tipoUsuario);
            if (!roleAssigned)
            {
                // Se não conseguiu atribuir a role, remove o usuário criado
                await _userManager.DeleteAsync(user);
                return (false, null, new[] { "Erro ao atribuir role ao usuário." });
            }

            return (true, user.Id, Array.Empty<string>());
        }

        /// <summary>
        /// Verifica se um usuário possui uma role específica
        /// </summary>
        /// <param name="userId">ID do usuário</param>
        /// <param name="tipoUsuario">Tipo de usuário a ser verificado</param>
        /// <returns>True se o usuário possui a role</returns>
        public async Task<bool> UserHasRoleAsync(string userId, TipoUsuario tipoUsuario)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return false;

            return await _userManager.HasRoleByTipoUsuarioAsync(user, tipoUsuario);
        }

        /// <summary>
        /// Obtém todas as roles de um usuário baseadas no enum TipoUsuario
        /// </summary>
        /// <param name="userId">ID do usuário</param>
        /// <returns>Lista de tipos de usuário que o usuário possui</returns>
        public async Task<IEnumerable<TipoUsuario>> GetUserRolesAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return Enumerable.Empty<TipoUsuario>();

            return await _userManager.GetTipoUsuarioRolesAsync(user);
        }
    }
}
