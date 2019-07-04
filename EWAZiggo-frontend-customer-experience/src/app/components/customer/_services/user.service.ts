import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '@environments/environment';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }


  static createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }


  register(user: User): Observable<any> {
    const headers = new HttpHeaders();
    UserService.createAuthorizationHeader(headers);
    return this.http.post(
      `${environment.apiUrl}/register`, user, {headers});
  }


  login(user: User) {
    const headers = new HttpHeaders();
    UserService.createAuthorizationHeader(headers);
    return this.http.post(
      `${environment.apiUrl}/login`, user, {headers});
  }

  // update(user: User) {
  //     return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  // }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
