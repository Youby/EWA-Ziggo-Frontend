export class User {
  idUser: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  jwtToken: number;

  constructor() {
    this.name = '';
    this.surname = '';
  }
}
