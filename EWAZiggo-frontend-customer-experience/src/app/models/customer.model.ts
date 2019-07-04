import {User} from './user.model';
import {Questionnaire} from './questionnaire.model';
import {Category} from './category.model';

export class Customer extends User {

  customerCode: string;
  address: string;
  birthdate: string;
  phone: string;
  mobilePhone: string;
  issues: Questionnaire[];

  constructor() {
    super();
    this.customerCode = 'N/A';
    this.address = 'N/A';
    this.birthdate = 'N/A';
    this.phone = 'N/A';
    this.mobilePhone = 'N/A';
    this.issues = [];
    const questionnaire = new Questionnaire();
    questionnaire.category =  new Category(1, 'geen internet');
    this.issues.push(questionnaire);
  }
}
