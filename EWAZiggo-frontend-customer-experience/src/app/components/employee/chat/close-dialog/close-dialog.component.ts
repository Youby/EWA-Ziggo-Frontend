import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.css']
})
export class CloseDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CloseDialogComponent>) {
  }

  ngOnInit() {
  }

  public endChat() {
    this.dialogRef.close(true);
  }

  public cancel() {
    this.dialogRef.close(false);
  }
}
