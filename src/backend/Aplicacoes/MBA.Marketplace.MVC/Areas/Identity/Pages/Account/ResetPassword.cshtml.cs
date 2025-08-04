// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace MBA.Marketplace.MVC.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ResetPasswordModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ILogger<ResetPasswordModel> _logger;

        public ResetPasswordModel(UserManager<IdentityUser> userManager, ILogger<ResetPasswordModel> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "O campo Email é obrigatório.")]
            [EmailAddress(ErrorMessage = "O campo Email não é um endereço de email válido.")]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required(ErrorMessage = "O campo Nova senha é obrigatório.")]
            [StringLength(100, ErrorMessage = "A senha deve ter no mínimo {2} e no máximo {1} caracteres.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Nova senha")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirmar nova senha")]
            [Compare("Password", ErrorMessage = "A nova senha e a confirmação de senha não coincidem.")]
            public string ConfirmPassword { get; set; }
        }

        public IActionResult OnGet(string email = null)
        {
            if (email == null)
            {
                return BadRequest("Email é obrigatório.");
            }

            Input = new()
            {
                Email = email
            };

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var user = await _userManager.FindByEmailAsync(Input.Email);
            if (user == null)
            {
                ModelState.AddModelError("Input.Email", "Email não consta no sistema.");
                return Page();
            }

            var removePasswordResult = await _userManager.RemovePasswordAsync(user);
            if (!removePasswordResult.Succeeded)
            {
                foreach (var error in removePasswordResult.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return Page();
            }

            var addPasswordResult = await _userManager.AddPasswordAsync(user, Input.Password);
            if (!addPasswordResult.Succeeded)
            {
                foreach (var error in addPasswordResult.Errors)
                {
                    if (error.Code.Equals("PasswordRequiresUpper"))
                    {
                        ModelState.AddModelError("Input.Password", error.Description);
                    }
                    else if (error.Code.Equals("PasswordRequiresLower"))
                    {
                        ModelState.AddModelError("Input.Password", error.Description);
                    }
                    else if (error.Code.Equals("PasswordRequiresDigit"))
                    {
                        ModelState.AddModelError("Input.Password", error.Description);
                    }
                    else if (error.Code.Equals("PasswordRequiresNonAlphanumeric"))
                    {
                        ModelState.AddModelError("Input.Password", error.Description);
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
                return Page();
            }

            _logger.LogInformation("User {Email} has reset their password.", Input.Email);
            
            return RedirectToPage("./Login", new { area = "Identity" });
        }
    }
}