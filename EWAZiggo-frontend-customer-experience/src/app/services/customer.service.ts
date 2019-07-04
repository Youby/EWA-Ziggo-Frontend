import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Customer} from '../models/customer.model';
import {Appointment} from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private serviceUrl = 'http://localhost:8080/VodafoneZiggoApi-1.2/services/rest/customers';

  constructor(private http: HttpClient) {
  }

  getCustomer(userId: number) {
    return this.http.get(this.serviceUrl + '/' + userId)
      .pipe(map(data => data as Customer));
  }

  getMechanicAppointments(userId: number) {
    return this.http.get(this.serviceUrl + '/' + userId + '/appointments')
      .pipe(map(data => data as Appointment[]));
  }

  getEquipment(userId: number) {
    return this.http.get(this.serviceUrl + '/' + userId + '/equipment');
  }
}
