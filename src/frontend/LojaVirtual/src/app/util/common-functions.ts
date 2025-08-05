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

export function senhaForteValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.value;

    if (!senha)
      return null;

    const errors: ValidationErrors = {};

    if (senha.length < 6) {
      errors["minLength"] = true;
    }
    if (!/[A-Z]/.test(senha)) {
      errors["maiuscula"] = true;
    }
    if (!/\d/.test(senha)) {
      errors["numero"] = true;
    }
    if (!/[\W_]/.test(senha)) {
      errors["caractereEspecial"] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}

