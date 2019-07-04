import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ErrorDialogComponent>) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }

}
