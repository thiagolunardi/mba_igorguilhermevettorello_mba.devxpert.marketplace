using Microsoft.AspNetCore.Identity;
using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;

namespace MBA.Marketplace.Business.Extensions
{
    public static class IdentityExtensions
    {
        /// <summary>
        /// Atribui uma role baseada no enum TipoUsuario a um usuário
        /// </summary>
        /// <param name="userManager">UserManager do Identity</param>
        /// <param name="user">Usuário a receber a role</param>
        /// <param name="tipoUsuario">Tipo de usuário baseado no enum</param>
        /// <returns>True se a role foi atribuída com sucesso</returns>
        public static async Task<bool> AssignRoleByTipoUsuarioAsync(
            this UserManager<IdentityUser> userManager, 
            IdentityUser user, 
            TipoUsuario tipoUsuario)
        {
            var roleName = tipoUsuario.GetDescription();
            var result = await userManager.AddToRoleAsync(user, roleName);
            return result.Succeeded;
        }

        /// <summary>
        /// Verifica se um usuário possui uma role específica baseada no enum TipoUsuario
        /// </summary>
        /// <param name="userManager">UserManager do Identity</param>
        /// <param name="user">Usuário a ser verificado</param>
        /// <param name="tipoUsuario">Tipo de usuário baseado no enum</param>
        /// <returns>True se o usuário possui a role</returns>
        public static async Task<bool> HasRoleByTipoUsuarioAsync(
            this UserManager<IdentityUser> userManager, 
            IdentityUser user, 
            TipoUsuario tipoUsuario)
        {
            var roleName = tipoUsuario.GetDescription();
            return await userManager.IsInRoleAsync(user, roleName);
        }

        /// <summary>
        /// Remove uma role baseada no enum TipoUsuario de um usuário
        /// </summary>
        /// <param name="userManager">UserManager do Identity</param>
        /// <param name="user">Usuário a ter a role removida</param>
        /// <param name="tipoUsuario">Tipo de usuário baseado no enum</param>
        /// <returns>True se a role foi removida com sucesso</returns>
        public static async Task<bool> RemoveRoleByTipoUsuarioAsync(
            this UserManager<IdentityUser> userManager, 
            IdentityUser user, 
            TipoUsuario tipoUsuario)
        {
            var roleName = tipoUsuario.GetDescription();
            var result = await userManager.RemoveFromRoleAsync(user, roleName);
            return result.Succeeded;
        }

        /// <summary>
        /// Obtém todas as roles baseadas no enum TipoUsuario que um usuário possui
        /// </summary>
        /// <param name="userManager">UserManager do Identity</param>
        /// <param name="user">Usuário a ser verificado</param>
        /// <returns>Lista de tipos de usuário que o usuário possui</returns>
        public static async Task<IEnumerable<TipoUsuario>> GetTipoUsuarioRolesAsync(
            this UserManager<IdentityUser> userManager, 
            IdentityUser user)
        {
            var userRoles = await userManager.GetRolesAsync(user);
            var tiposUsuario = new List<TipoUsuario>();

            foreach (var role in userRoles)
            {
                var tipoUsuario = Enum.GetValues(typeof(TipoUsuario))
                    .Cast<TipoUsuario>()
                    .FirstOrDefault(t => t.GetDescription() == role);
                
                if (tipoUsuario != default(TipoUsuario))
                {
                    tiposUsuario.Add(tipoUsuario);
                }
            }

            return tiposUsuario;
        }
    }
} 