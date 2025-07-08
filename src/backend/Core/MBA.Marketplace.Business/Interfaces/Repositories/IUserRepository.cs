using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Identity;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface IUserRepository<T>
    {
        Task<IdentityUser> FindByEmailAsync(string email);
        Task<bool> CheckPasswordAsync(IdentityUser usuario, string senha);
    }
}
