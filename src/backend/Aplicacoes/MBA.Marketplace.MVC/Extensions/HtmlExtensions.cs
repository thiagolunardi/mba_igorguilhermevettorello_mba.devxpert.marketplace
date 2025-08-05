using Microsoft.AspNetCore.Mvc.Rendering;
using System.Web;

namespace MBA.Marketplace.MVC.Extensions
{
    public static class HtmlExtensions
    {
        public static string CheckImage(this IHtmlHelper html, string imageSrc)
        {
            var resultDefault = "/images/foto-indisponivel.png";

            return string.IsNullOrEmpty(imageSrc) ? resultDefault : imageSrc;
        }
    }
}
