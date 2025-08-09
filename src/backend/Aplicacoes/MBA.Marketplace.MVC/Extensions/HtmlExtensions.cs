using Microsoft.AspNetCore.Mvc.Rendering;
using System.Web;

namespace MBA.Marketplace.MVC.Extensions
{
    public static class HtmlExtensions
    {
        public static string CheckImage(this IHtmlHelper html, string imageSrc)
        {
            var pathImagens = "/images/produtos";
            var resultDefault = "/images/foto-indisponivel.png";

            var result = string.IsNullOrEmpty(imageSrc) ? resultDefault : $"{pathImagens}/{imageSrc}";

            return result;
        }
    }


}
