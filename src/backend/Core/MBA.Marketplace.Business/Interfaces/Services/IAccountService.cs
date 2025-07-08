using MBA.Marketplace.Business.DTOs;
using MBA.Marketplace.Business.Enums;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface IAccountService
    {
        Task<(bool Success, string Token, IEnumerable<string> Errors)> LoginAsync(LoginDto dto);
        
        /// <summary>
        /// Registra um novo usuário com uma role específica baseada no enum TipoUsuario
        /// </summary>
        /// <param name="dto">Dados do usuário a ser registrado</param>
        /// <param name="tipoUsuario">Tipo de usuário baseado no enum</param>
        /// <returns>Resultado da operação</returns>
        Task<(bool Success, string UserId, IEnumerable<string> Errors)> RegisterUserWithRoleAsync(RegistrarUsuarioDto dto, TipoUsuario tipoUsuario);
        
        /// <summary>
        /// Verifica se um usuário possui uma role específica
        /// </summary>
        /// <param name="userId">ID do usuário</param>
        /// <param name="tipoUsuario">Tipo de usuário a ser verificado</param>
        /// <returns>True se o usuário possui a role</returns>
        Task<bool> UserHasRoleAsync(string userId, TipoUsuario tipoUsuario);
        
        /// <summary>
        /// Obtém todas as roles de um usuário baseadas no enum TipoUsuario
        /// </summary>
        /// <param name="userId">ID do usuário</param>
        /// <returns>Lista de tipos de usuário que o usuário possui</returns>
        Task<IEnumerable<TipoUsuario>> GetUserRolesAsync(string userId);
    }
}
