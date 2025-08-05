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

export interface ItemEmDestaqueViewModel {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  estoque: number;
  categoriaId: string;
  categoria: Categoria;
  vendedorId: string;
  vendedor: Vendedor;
  ativo: boolean;
}
