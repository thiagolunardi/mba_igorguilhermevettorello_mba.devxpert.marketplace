import { HttpParams } from "@angular/common/http";
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

export function senhasIguaisValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const confirmacao = control.get('confirmacaoSenha')?.value;

    if (senha && confirmacao && senha !== confirmacao) {
      return { senhasDiferentes: true };
    }

    return null;
  };
}

