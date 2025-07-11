import { HttpParams } from "@angular/common/http";

export function adicionarParametrosSePossuirValor(httpParams: HttpParams, parametros: IParametro[]): HttpParams {
  for (const parametro of parametros) {
    if (!parametro.nome || !parametro.valor)
      continue;

    httpParams = httpParams.set(parametro.nome, parametro.valor);
  }

  return httpParams;
}

export interface IParametro {
  nome: string;
  valor: string | number | undefined | null;
}
