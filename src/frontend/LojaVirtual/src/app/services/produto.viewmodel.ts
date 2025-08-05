export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
}

export interface Vendedor {
  id: string;
  nome: string;
  email: string;
}

export interface ProdutoViewModel {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  estoque: number;
  categoria: Categoria;
  vendedor: Vendedor;
}
