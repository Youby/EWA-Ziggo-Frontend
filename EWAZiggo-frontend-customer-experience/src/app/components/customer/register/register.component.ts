import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, UserService, AuthenticationService } from '../_services';
import {User} from '../../../models/user.model';
import {ErrorDialogComponent} from '../../client-chat/error-dialog/error-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {RegisterDialogComponent} from '@customer//register/register-dialog/register-dialog.component';

@Component({templateUrl: 'register.component.html',
            styleUrls: ['../my-theme.scss' + '../styles.css']})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  dialogRef: MatDialogRef<RegisterDialogComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.user = this.registerForm.value;

    this.loading = true;
    this.userService.register(this.user).subscribe(
      () => {
        this.dialogRef = this.dialog.open(RegisterDialogComponent);
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error('Email already exists');
        this.loading = false;
      });
  }
}
