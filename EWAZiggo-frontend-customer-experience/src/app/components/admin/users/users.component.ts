import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import {EmployeeService} from '../../../services/employee.service';
import {User} from '../../../models/user.model';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {Employee} from '../../../models/employee.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  employees: Employee[];
  isPopupOpened = false;
  displayedColumns: string[] = ['idUser', 'email', 'password', 'name', 'surname', 'department'];
  dataSource = new MatTableDataSource(this.employees);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService, private dialog?: MatDialog) {
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createEmployee() {
    this.isPopupOpened = true;
    const settings: MatDialogConfig = {
      minWidth: 400,
      minHeight: 300
    };
    const dialogRef = this.dialog.open(CreateEmployeeComponent, settings);

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
}

