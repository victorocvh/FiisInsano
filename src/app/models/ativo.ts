import { Console } from "console";
import * as moment from "moment";
import { UserUID } from "./usuario";

export class Ativo {
  public atvCod : string;
  public atvQuantidade: number;
  public atvPrecoMedio: number;
  public atvTipo: TipoAtvEnum;
  public atvValorTotal: number;
  public atvAlocacao: number;
  public atvPrecoAtual: number;
  public atvPrecoMercado: number;
  public key: string;
  public dataCompra: moment.Moment;

  /**
   *
   */
  constructor(atv: Ativo | null, key: string | null) {
    this.atvCod = atv == null ? '' : atv.atvCod;
    this.atvQuantidade = atv == null ? 0: atv.atvQuantidade;
    this.atvPrecoMedio = atv == null ? 0: atv.atvPrecoMedio;
    this.key = key != null ? key : '';
    this.atvValorTotal = this.atvQuantidade * this.atvPrecoMedio;
    this.atvPrecoAtual = 0;
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
  public atvPrecoAtual: number;
  public atvTipo: number;
  public dataCompra: string;

  constructor(ativo: Ativo) {
    super();
    this.atvCod = ativo.atvCod;
    this.atvPrecoAtual = ativo.atvPrecoAtual;
    this.atvQuantidade = ativo.atvQuantidade;
    this.atvTipo = ativo.atvTipo;
    this.dataCompra = ativo.dataCompra.toISOString();
  }
}
