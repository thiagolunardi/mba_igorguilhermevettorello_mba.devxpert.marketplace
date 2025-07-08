using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
