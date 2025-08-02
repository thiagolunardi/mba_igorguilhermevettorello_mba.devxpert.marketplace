// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace MBA.Marketplace.MVC.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterConfirmationModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _sender;
        private readonly IWebHostEnvironment _environment;
        private readonly IConfiguration _configuration;

        public RegisterConfirmationModel(
            UserManager<IdentityUser> userManager, 
            IEmailSender sender,
            IConfiguration configuration, 
            IWebHostEnvironment environment)
        {
            _userManager = userManager;
            _sender = sender;
            _configuration = configuration;
            _environment = environment;
        }

        public string Email { get; set; }

        public bool DisplayConfirmAccountLink { get; set; }
        public bool EmailService { get; set; }
        public bool IsDevelopment { get; set; }


        public string EmailConfirmationUrl { get; set; }

        public async Task<IActionResult> OnGetAsync(string email, string returnUrl = null)
        {
            if (email == null)
            {
                return RedirectToPage("/Index");
            }
            returnUrl = returnUrl ?? Url.Content("~/");

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"Não é possível carregar o usuário com e-mail '{email}'.");
            }

            
            IsDevelopment = _environment.IsDevelopment();
            EmailService = _configuration.GetValue<bool>("EmailService");
            Email = email;
            DisplayConfirmAccountLink = !EmailService;
            if (DisplayConfirmAccountLink)
            {
                var userId = await _userManager.GetUserIdAsync(user);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                EmailConfirmationUrl = Url.Page(
                    "/Account/ConfirmEmail",
                    pageHandler: null,
                    values: new { area = "Identity", userId = userId, code = code, returnUrl = returnUrl },
                    protocol: Request.Scheme);
            }

            return Page();
        }
    }
}
