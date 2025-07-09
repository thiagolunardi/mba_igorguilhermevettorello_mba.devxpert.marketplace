namespace MBA.Marketplace.Business.DTOs.Paginacao
{
    public class ParametrosDePesquisaPaginada
    {
        private const int TamanhoMaximoDaPagina = 50;
        public int NumeroDaPagina { get; set; } = 1;

        private int tamanhoDaPagina = 10;

        public int TamanhoDaPagina
        {
            get => tamanhoDaPagina;
            set => tamanhoDaPagina = value > TamanhoMaximoDaPagina ? TamanhoMaximoDaPagina : value;
        }

        public string? OrderBy { get; set; }
    }
}
