import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }
}
