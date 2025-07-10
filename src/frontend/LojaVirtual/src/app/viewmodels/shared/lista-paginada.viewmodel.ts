export interface ListaPaginada<T> {
  itens: T[];
  paginaAtual: number;
  numeroDePaginas: number;
  tamanhoDaPagina: number;
  totalDeItens: number;
  temPaginaAnterior: number;
  temProximaPagina: number;
}
