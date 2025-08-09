using MBA.Marketplace.Business.Interfaces.Services;
using Microsoft.Extensions.Configuration;

namespace MBA.Marketplace.Business.Services
{
    public class ImagemService : IImagemService
    {
        private readonly IConfiguration _config;

        public ImagemService(IConfiguration config)
        {
            _config = config;
        }

        public string? ConverterImagemEmBase64(string nomeArquivo)
        {
            var caminhoImagemBase = @$"{Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, _config["SharedFiles:ImagensPath"])}";
            var caminhoImagemCompleto = Path.Combine(caminhoImagemBase, nomeArquivo);

            if (!File.Exists(caminhoImagemCompleto))
            {
                return null;
            }

            var bytesImagem = System.IO.File.ReadAllBytes(caminhoImagemCompleto);
            var base64 = Convert.ToBase64String(bytesImagem);
            var mimeType = ObterMimeType(Path.GetExtension(caminhoImagemCompleto));

            return $"data:{mimeType};base64,{base64}";
        }

        private string ObterMimeType(string extensao)
        {
            return extensao switch
            {
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => throw new NotSupportedException("Tipo de imagem não suportado.")
            };
        }
    }
}
