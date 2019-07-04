import {User} from './user.model';

export class Employee extends User {
  department: string;

  constructor(idUser?: number, email?: string, password?: string, name?: string, surname?: string, jwtToken?: number, department?: string) {
    super();
    if (department != null) {
      this.department = department;
    } else 
    this.department = '';
  }
}

