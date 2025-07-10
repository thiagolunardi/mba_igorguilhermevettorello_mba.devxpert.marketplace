using System.ComponentModel;

namespace MBA.Marketplace.Business.Enums
{
    public enum TipoUsuario
    {
        [Description("Administrador")]
        Administrador,
        [Description("Vendedor")]
        Vendedor,
        [Description("Cliente")]
        Cliente
    }
}
