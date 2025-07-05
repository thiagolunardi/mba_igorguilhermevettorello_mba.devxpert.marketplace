export interface ProdutoViewModel {
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  estoque: number;
  // categoriaId: guid; //TODO: verificar se há tipo Guid no Angular
  // Categoria Categoria; //TODO: avaliar necessidade de incluir a categoria no produto
  // Guid VendedorId; //TODO: verificar se há tipo Guid no Angular
  // Vendedor Vendedor; //TODO: avaliar necessidade de incluir o vendedor no produto
  createdAt: Date;
  updatedAt: Date;
  // src: string;
}
