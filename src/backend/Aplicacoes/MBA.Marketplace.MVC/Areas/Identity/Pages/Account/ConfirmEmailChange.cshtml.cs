// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using MBA.Marketplace.Business.Enums;
using MBA.Marketplace.Business.Extensions;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.Data.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace MBA.Marketplace.MVC.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ConfirmEmailChangeModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<ConfirmEmailChangeModel> _logger;
        private readonly ApplicationDbContext _appContext;

        public ConfirmEmailChangeModel(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            ILogger<ConfirmEmailChangeModel> logger,
            ApplicationDbContext appContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _appContext = appContext;
        }

        [TempData]
        public string StatusMessage { get; set; }

        public async Task<IActionResult> OnGetAsync(string userId, string email, string code)
        {
            if (userId == null || email == null || code == null)
            {
                return RedirectToPage("/Index");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Não foi possível encontrar o usuário com ID '{userId}'.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ChangeEmailAsync(user, email, code);
            
            if (result.Succeeded)
            {
                await _userManager.SetUserNameAsync(user, email);
                var vendedor = await _appContext.Vendedores.FirstOrDefaultAsync(v => v.Id == userId.NormalizeGuid());
                if (vendedor != null)
                {
                    vendedor.Email = email;
                    vendedor.UpdatedAt = DateTime.Now;
                    await _appContext.SaveChangesAsync();
                }

                StatusMessage = "Obrigado por confirmar a alteração do seu email. Seu email foi atualizado com sucesso!";
                _logger.LogInformation("User changed email to {Email} for user {UserId}", email, userId);
            }
            else
            {
                StatusMessage = "Erro ao confirmar a alteração do email. O link pode ter expirado ou ser inválido.";
                _logger.LogWarning("Error changing email for user {UserId}: {Errors}", userId, string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return Page();
        }
    }
}