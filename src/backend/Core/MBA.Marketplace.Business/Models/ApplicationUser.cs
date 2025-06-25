using Microsoft.AspNetCore.Identity;

namespace MBA.Marketplace.Business.Models
{
    public class ApplicationUser : IdentityUser
    {
        public Vendedor Vendedor { get; set; }
    }
}
