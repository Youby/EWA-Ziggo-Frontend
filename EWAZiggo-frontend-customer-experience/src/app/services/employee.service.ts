import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../models/user.model';
import {Employee} from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private serviceUrl = 'http://localhost:8080/VodafoneZiggoApi-1.2/services/rest/employees';

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get(this.serviceUrl)
      .pipe(map(data => data as Employee[]));
  }

  createEmployee(model: Employee): Observable<Employee> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Employee>(this.serviceUrl, model, {headers});
  }
}
