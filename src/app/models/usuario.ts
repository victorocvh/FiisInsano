export class Usuario {
  public email: string;
  public nome: string;
  public password: string;
  public uid: string;

  /**
   *
   */
  constructor() {
    this.email = '';
    this.nome = '';
    this.password = '';
    this.uid = '';
  }
}

export class UserDB {
  public email: string;
  public nome: string;
  private ativo: number;

  constructor(user: Usuario) {
    this.email = user.email;
    this.nome = user.nome;
    this.ativo = 0;
  }
}

export class UserUID {
  public uid : string;
}
