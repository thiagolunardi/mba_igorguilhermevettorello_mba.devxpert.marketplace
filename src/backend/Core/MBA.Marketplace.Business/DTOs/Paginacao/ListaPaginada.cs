using Microsoft.EntityFrameworkCore;

namespace MBA.Marketplace.Business.DTOs.Paginacao
{
    public class ListaPaginada<T>
    {
        public List<T> Itens { get; private set; } = new List<T>();
        public int PaginaAtual { get; private set; }
        public int NumeroDePaginas { get; private set; }
        public int TamanhoDaPagina { get; private set; }
        public int TotalDeItens { get; private set; }

        public bool TemPaginaAnterior => PaginaAtual > 1;
        public bool TemProximaPagina => PaginaAtual < NumeroDePaginas;

        public ListaPaginada(List<T> itens, int totalDeItens, int numeroDaPagina, int tamanhoDaPagina)
        {
            TotalDeItens = totalDeItens;
            TamanhoDaPagina = tamanhoDaPagina;
            PaginaAtual = numeroDaPagina;
            NumeroDePaginas = (int)Math.Ceiling(TotalDeItens / (double)tamanhoDaPagina);
            Itens.AddRange(itens);
        }

        public static async Task<ListaPaginada<T>> ListarAsync(IQueryable<T> query, int numeroDaPagina, int tamanhoDaPagina)
        {
            var totalDeItens = await query.CountAsync();
            var itens = await query
                .Skip((numeroDaPagina - 1) * tamanhoDaPagina)
                .Take(tamanhoDaPagina)
                .ToListAsync();

            return new ListaPaginada<T>(itens, totalDeItens, numeroDaPagina, tamanhoDaPagina);
        }
    }
}
