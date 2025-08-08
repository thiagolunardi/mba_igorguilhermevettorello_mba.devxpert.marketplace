import { VendedorViewModel } from "../vendedor-detalhes/vendedor-viewmodel";
import { CategoriaViewModel } from "./categoria.viewmodel";

export interface ProdutoViewModel {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  estoque: number;
  categoriaId: string;
  categoria: CategoriaViewModel;
  src: string;
  vendedorId: string;
  vendedor: VendedorViewModel;
}
