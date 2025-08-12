namespace MBA.Marketplace.Business.DTOs.Paginacao
{
    public class PesquisaDeProdutos : ParametrosDePesquisaPaginada
    {
        public Guid? CategoriaId { get; set; }
        public string? TermoPesquisado { get; set; }
        public Guid? VendedorId { get; set; }
    }
}
