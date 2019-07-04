import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@customer//_services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
  }
}
