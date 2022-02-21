import { Console } from "console";
import { UserUID } from "./usuario";

export class Ativo {
  public atvCod : string;
  public atvQuantidade: number;
  public atvPrecoMedio: number;
  public atvTipo: TipoAtvEnum;
  public atvValorTotal: number;
  public atvAlocacao: number;
  public key: string;

  /**
   *
   */
  constructor(atv: Ativo | null, key: string | null) {
    this.atvCod = atv == null ? '' : atv.atvCod;
    this.atvQuantidade = atv == null ? 0: atv.atvQuantidade;
    this.atvPrecoMedio = atv == null ? 0: atv.atvPrecoMedio;
    this.key = key != null ? key : '';
    this.atvValorTotal = this.atvQuantidade * this.atvPrecoMedio;
  }

}

export enum TipoAtvEnum {
  Shoppings,
  GalpoesLogisticos,
  LajesCorporativas,
  Papel,
  Tijolo
}

export class AtivoDB extends UserUID {
  public atvCod : string;
  public atvQuantidade: number;
  public atvPrecoMedio: number;
  public atvTipo: number;

  constructor(ativo: Ativo) {
    super();
    this.atvCod = ativo.atvCod;
    this.atvPrecoMedio = ativo.atvPrecoMedio;
    this.atvQuantidade = ativo.atvQuantidade;
    this.atvTipo = ativo.atvTipo;
  }
}
