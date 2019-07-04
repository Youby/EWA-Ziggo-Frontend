import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private userService: UserService;
  public loggedIn: boolean;

  constructor(private http: HttpClient, private router: Router ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  checkIfLoggedIn() {
    if (this.currentUserSubject.value) {
      this.loggedIn = true;
    }
  }

  authenticate(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.loggedIn = true;

  }


  logout() {
    // remove user from local storage to log user out
    this.router.navigate(['/login']);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loggedIn = false;
  }
}
