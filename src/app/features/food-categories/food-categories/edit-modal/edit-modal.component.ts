import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidatorService } from "@base/app/core/services/validators/validator.service";
import { resources } from '@core/enums';
import { FoodCategory } from '@core/interfaces/models/food-category.interface';
import { editModalParameters } from '@food-categories/enums';
import { AsyncValidators } from '@base/app/shared/validators/async-validators';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.sass']
})
export class EditModalComponent implements OnInit {

  public parameters = editModalParameters;
  public title: string = '';
  public nameControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { foodCategory: FoodCategory },
    private validatorService: ValidatorService
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.dialogRef.updateSize('55rem', '21rem');
  }
  private setForm() {
    this.nameControl.setValidators([Validators.required]);
    if (this.data.foodCategory.id) {
      this.nameControl.setValue(this.data.foodCategory.name);
      this.nameControl.setAsyncValidators([AsyncValidators.checkNameForEdition(this.data.foodCategory.name, this.validatorService, resources.foodCategories)])
      this.title = this.parameters.editionTitle;
    } else {
      this.title = this.parameters.creationTitle;
      this.nameControl.setAsyncValidators([AsyncValidators.checkName(this.validatorService, resources.foodCategories)]);
    }
  }

  public submit() {
    if (this.nameControl.valid) {
      this.data.foodCategory = { ...this.data.foodCategory, name: this.nameControl.value.trim() }
      this.dialogRef.close(this.data.foodCategory);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
