using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;

namespace MBA.Marketplace.MVC.Areas.Identity.Pages.Account
{
    /// <summary>
    /// Página de negação de acesso exibida quando o usuário não tem permissão para acessar um recurso
    /// </summary>
    [AllowAnonymous]
    public class AccessDeniedModel : PageModel
    {
        private readonly ILogger<AccessDeniedModel> _logger;

        /// <summary>
        /// Construtor da página de acesso negado
        /// </summary>
        /// <param name="logger">Logger para registrar eventos da página</param>
        public AccessDeniedModel(ILogger<AccessDeniedModel> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// URL para redirecionamento após o usuário sair da página
        /// </summary>
        public string? ReturnUrl { get; set; }

        /// <summary>
        /// Razão específica da negação de acesso
        /// </summary>
        public string? DenialReason { get; set; }

        /// <summary>
        /// Indica se o usuário está autenticado mas sem permissão
        /// </summary>
        public bool IsAuthenticated { get; set; }

        /// <summary>
        /// Processamento da requisição GET para a página de acesso negado
        /// </summary>
        /// <param name="returnUrl">URL de retorno após o acesso</param>
        /// <param name="reason">Razão específica da negação</param>
        public void OnGet(string? returnUrl = null, string? reason = null)
        {
            ReturnUrl = returnUrl ?? Url.Content("~/");
            DenialReason = reason;
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false;

            // Log do evento de acesso negado
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

            // Se há uma razão específica, adiciona como TempData para ser exibida
            if (!string.IsNullOrEmpty(reason))
            {
                TempData["DenialMessage"] = GetDenialMessage(reason);
            }
        }

        /// <summary>
        /// Obtém uma mensagem amigável baseada na razão da negação
        /// </summary>
        /// <param name="reason">Código da razão</param>
        /// <returns>Mensagem formatada para exibição</returns>
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