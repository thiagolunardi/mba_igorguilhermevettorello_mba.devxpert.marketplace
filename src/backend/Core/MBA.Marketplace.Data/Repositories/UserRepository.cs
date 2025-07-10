using MBA.Marketplace.Business.Interfaces.Repositories;
using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Identity;

namespace MBA.Marketplace.Data.Repositories
{
    public class UserRepository : IUserRepository<IdentityUser>
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserRepository(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> CheckPasswordAsync(IdentityUser usuario, string senha)
        {
            return await _userManager.CheckPasswordAsync(usuario, senha);
        }

        public async Task<IdentityUser?> FindByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }
    }
}
