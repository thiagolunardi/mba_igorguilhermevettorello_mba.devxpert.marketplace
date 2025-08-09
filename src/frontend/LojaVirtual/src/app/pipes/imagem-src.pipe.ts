import { Pipe, PipeTransform } from '@angular/core';
import { IMAGEM_PLACEHOLDER, URL_IMAGENS } from '../util/constantes';

@Pipe({
  name: 'imagemSrc',
  standalone: true
})
export class ImagemSrcPipe implements PipeTransform {
  transform(imagem: string | null | undefined): string {
    return imagem ? URL_IMAGENS + imagem : IMAGEM_PLACEHOLDER;
  }
}
