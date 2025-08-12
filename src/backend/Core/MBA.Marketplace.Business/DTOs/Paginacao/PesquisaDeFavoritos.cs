namespace MBA.Marketplace.Business.DTOs.Paginacao
{
    public class PesquisaDeFavoritos : ParametrosDePesquisaPaginada
    {
        public Guid? ClienteId { get; set; }
    }
}
