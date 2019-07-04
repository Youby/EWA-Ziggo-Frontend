import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {

  rating = [false, false, false, false, false];

  constructor(private dialogRef: MatDialogRef<RatingDialogComponent>) {
  }

  ngOnInit() {
  }

  hover(index) {
    for (let i = 0; i <= index; i++) {
      this.rating[i] = true;
    }
  }

  unhover(index) {
    console.log('index = ' + index);
    console.log(this.rating);
    this.rating = [false, false, false, false, false];
    console.log(this.rating);
  }

  rateChat(score) {
    this.dialogRef.close(score);
  }
}
