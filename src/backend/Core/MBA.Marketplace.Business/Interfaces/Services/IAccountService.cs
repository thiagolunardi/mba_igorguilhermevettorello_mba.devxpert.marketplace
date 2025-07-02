using MBA.Marketplace.Business.DTOs;

namespace MBA.Marketplace.Business.Interfaces.Services
{
    public interface IAccountService
    {
        Task<(bool Success, string Token, IEnumerable<string> Errors)> LoginAsync(LoginDto dto);
    }
}
