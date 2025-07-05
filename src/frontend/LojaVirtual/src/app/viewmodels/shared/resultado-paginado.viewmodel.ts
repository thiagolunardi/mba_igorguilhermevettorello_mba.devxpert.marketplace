export interface ResultadoPaginadoViewModel<T> {
  itens: T[];
  totalItens: number;
  totalPaginas: number;
  paginaAtual: number;
  itensPorPagina: number;
}
