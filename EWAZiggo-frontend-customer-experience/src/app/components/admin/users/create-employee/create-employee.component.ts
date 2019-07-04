import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Employee} from '../../../../models/employee.model';
import {EmployeeService} from '../../../../services/employee.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  public employeeForm = new FormGroup({
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<CreateEmployeeComponent>, private service: EmployeeService) {
  }

  newEmployee = new Employee(null, '', '', '', '', null, '');

  onSubmit(): void {
    this.service.createEmployee(this.newEmployee).subscribe(
      (data: Employee) => {
        console.log(data);
        this.dialogRef.close();
      },
      (error: any) => console.log(error)
    );
    this.service.getEmployees;
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }


}

