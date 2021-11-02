import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.sass']
})
export class InformationDialogComponent implements OnInit {

  public title: string = ''

  constructor(
    public dialogRef: MatDialogRef<InformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData) { }

  ngOnInit(): void {
    this.makeSubscriptions();
    this.setDialog();
  }
  makeSubscriptions() {
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 2500)
    });
  }
  setDialog() {
    if (this.data.title) {
      this.title = this.data.title;
    }
    this.dialogRef.updateSize('25%', 'auto');
  }
}

export interface dialogData {
  title: string,
  message: string,
  icon: 'done' | 'fail'
}
