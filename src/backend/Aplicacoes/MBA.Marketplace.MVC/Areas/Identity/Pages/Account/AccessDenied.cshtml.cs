using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;

namespace MBA.Marketplace.MVC.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class AccessDeniedModel : PageModel
    {
        private readonly ILogger<AccessDeniedModel> _logger;

        public AccessDeniedModel(ILogger<AccessDeniedModel> logger)
        {
            _logger = logger;
        }

        public string? ReturnUrl { get; set; }

        public string? DenialReason { get; set; }

        public bool IsAuthenticated { get; set; }

        public void OnGet(string? returnUrl = null, string? reason = null)
        {
            ReturnUrl = returnUrl ?? Url.Content("~/");
            DenialReason = reason;
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false;

            var userName = User.Identity?.Name ?? "Usuário anônimo";
            var userAgent = Request.Headers["User-Agent"].ToString();
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

            _logger.LogWarning(
                "Acesso negado para usuário '{UserName}' na URL '{ReturnUrl}'. Razão: '{Reason}'. IP: {IpAddress}, UserAgent: {UserAgent}",
                userName,
                ReturnUrl,
                DenialReason ?? "Não especificada",
                ipAddress,
                userAgent
            );

            if (!string.IsNullOrEmpty(reason))
            {
                TempData["DenialMessage"] = GetDenialMessage(reason);
            }
        }

        private string GetDenialMessage(string reason)
        {
            return reason.ToLower() switch
            {
                "role" => "Você não possui o perfil necessário para acessar esta funcionalidade.",
                "policy" => "Esta operação requer permissões especiais que você não possui.",
                "expired" => "Sua sessão expirou. Faça login novamente.",
                "suspended" => "Sua conta foi suspensa. Entre em contato com o suporte.",
                "maintenance" => "Esta funcionalidade está temporariamente indisponível para manutenção.",
                _ => "Acesso não autorizado para este recurso."
            };
        }
    }
} 