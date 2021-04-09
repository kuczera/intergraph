import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './pwd-dialog.component.html',
  styleUrls: ['./pwd-dialog.component.css']
})
export class PwdDialogComponent implements OnInit{
  password = '';

  constructor(
    public dialogRef: MatDialogRef<PwdDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
