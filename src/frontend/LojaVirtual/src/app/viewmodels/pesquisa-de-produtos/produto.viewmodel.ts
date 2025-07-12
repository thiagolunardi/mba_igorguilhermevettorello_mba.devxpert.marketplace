import { CategoriaViewModel } from "./categoria.viewmodel";

export interface ProdutoViewModel {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  categoriaId: string;
  categoria: CategoriaViewModel;
}
