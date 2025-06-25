using MBA.Marketplace.Business.Models;
using Microsoft.AspNetCore.Identity;

namespace MBA.Marketplace.Business.Interfaces.Repositories
{
    public interface IUserRepository<T>
    {
        Task<ApplicationUser> FindByEmailAsync(string email);
        Task<bool> CheckPasswordAsync(ApplicationUser usuario, string senha);
    }
}
