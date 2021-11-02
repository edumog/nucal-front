import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.sass']
})
export class ConfirmationDialogComponent implements OnInit {

  public title: string = '¿Desea continuar?'

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { continue: boolean, title?:string }) { }

  ngOnInit(): void {
    if(this.data.title) {
      this.title = this.data.title;
    }
    this.dialogRef.updateSize('34rem', 'auto');
  }

  public submit(response: boolean) {
    this.data = { continue: response }
    this.dialogRef.close(this.data.continue);
  }
}
