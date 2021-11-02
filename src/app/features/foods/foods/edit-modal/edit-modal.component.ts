import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { resources } from '@core/enums';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';
import { Food } from '@core/interfaces/models/food.interface';
import { ValidatorService } from '@core/services/validators/validator.service';
import { formParameters } from '@foods/enums';

import { AsyncValidators } from '@shared/validators/async-validators';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.sass']
})
export class EditModalComponent implements OnInit {

  public parameters = formParameters;
  public title: string;
  public foodForm: FormGroup;
  public food: Food;
  public isFoodLoading: boolean = false;
  private foodId: string = '';

  @Input() foodCategoriesCombo: string;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      combo: { id: string, name: string }[],
      food: Observable<FoodWithDetails>,
      isFoodLoading: Observable<boolean>
    },
    private validatorService: ValidatorService
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.data.food.subscribe((food: any) => {
      if(food) {
        this.title = this.parameters.editionTitle,
        this.foodId = food.id;
        this.setInitialValues(food);
        this.setValidatorsForEdition(food.name);
      }else {
        this.title = this.parameters.creationTitle;
        this.setValidatorsForCreation();
      }       
    });
    this.data.isFoodLoading.subscribe((response: boolean) => this.isFoodLoading = response);
  }
  private setForm(): void {
    this.foodForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      referenceMeasurements: new FormGroup({
        referenceMassInGrams: new FormControl(0),
        referenceVolumeInMililiters: new FormControl(0),
        referenceUnits: new FormControl(0)
      }),
      fattyAcidsAndCholesterol: new FormGroup({
        saturatedFat: new FormControl(0),
        monounsaturatedFat: new FormControl(0),
        polyunsaturatedFat: new FormControl(0),
        cholesterol: new FormControl(0)
      }),
      macronutrients: new FormGroup({
        calories: new FormControl(0),
        protein: new FormControl(0),
        carbohydrates: new FormControl(0),
        grease: new FormControl(0),
        fiber: new FormControl(0)
      }),
      minerals: new FormGroup({
        calcium: new FormControl(0),
        iron: new FormControl(0),
        sodium: new FormControl(0),
        phosphorus: new FormControl(0),
        iodo: new FormControl(0),
        zinc: new FormControl(0),
        manganese: new FormControl(0),
        potassium: new FormControl(0)
      }),
      vitamins: new FormGroup({
        thiamin: new FormControl(0),
        riboflavin: new FormControl(0),
        niacin: new FormControl(0),
        folates: new FormControl(0),
        vitaminB12: new FormControl(0),
        vitaminC: new FormControl(0),
        vitaminA: new FormControl(0)
      })
    })
  }

  private setInitialValues(food: FoodWithDetails): void {
    this.foodForm.get('name')?.setValue(food.name);
    this.foodForm.get('categories')?.setValue(food.categories);
    this.foodForm.get('referenceMeasurements.referenceMassInGrams')?.setValue(food.referenceMeasurements.referenceMassInGrams);
    this.foodForm.get('referenceMeasurements.referenceVolumeInMililiters')?.setValue(food.referenceMeasurements.referenceVolumeInMililiters);
    this.foodForm.get('referenceMeasurements.referenceUnits')?.setValue(food.referenceMeasurements.referenceUnits);
    this.foodForm.get('fattyAcidsAndCholesterol.saturatedFat')?.setValue(food.fattyAcidsAndCholesterol.saturatedFat);
    this.foodForm.get('fattyAcidsAndCholesterol.monounsaturatedFat')?.setValue(food.fattyAcidsAndCholesterol.monounsaturatedFat);
    this.foodForm.get('fattyAcidsAndCholesterol.polyunsaturatedFat')?.setValue(food.fattyAcidsAndCholesterol.polyunsaturatedFat);
    this.foodForm.get('fattyAcidsAndCholesterol.cholesterol')?.setValue(food.fattyAcidsAndCholesterol.cholesterol);
    this.foodForm.get('macronutrients.calories')?.setValue(food.macronutrients.calories);
    this.foodForm.get('macronutrients.protein')?.setValue(food.macronutrients.protein);
    this.foodForm.get('macronutrients.carbohydrates')?.setValue(food.macronutrients.carbohydrates);
    this.foodForm.get('macronutrients.grease')?.setValue(food.macronutrients.grease);
    this.foodForm.get('macronutrients.fiber')?.setValue(food.macronutrients.fiber);
    this.foodForm.get('minerals.calcium')?.setValue(food.minerals.calcium);
    this.foodForm.get('minerals.iron')?.setValue(food.minerals.iron);
    this.foodForm.get('minerals.sodium')?.setValue(food.minerals.sodium);
    this.foodForm.get('minerals.phosphorus')?.setValue(food.minerals.phosphorus);
    this.foodForm.get('minerals.iodo')?.setValue(food.minerals.iodo);
    this.foodForm.get('minerals.zinc')?.setValue(food.minerals.zinc);
    this.foodForm.get('minerals.manganese')?.setValue(food.minerals.manganese);
    this.foodForm.get('minerals.potassium')?.setValue(food.minerals.potassium);
    this.foodForm.get('vitamins.thiamin')?.setValue(food.vitamins.thiamin);
    this.foodForm.get('vitamins.riboflavin')?.setValue(food.vitamins.riboflavin);
    this.foodForm.get('vitamins.niacin')?.setValue(food.vitamins.niacin);
    this.foodForm.get('vitamins.folates')?.setValue(food.vitamins.folates);
    this.foodForm.get('vitamins.vitaminB12')?.setValue(food.vitamins.vitaminB12);
    this.foodForm.get('vitamins.vitaminC')?.setValue(food.vitamins.vitaminC);
    this.foodForm.get('vitamins.vitaminA')?.setValue(food.vitamins.vitaminA);
  }
  setValidatorsForEdition(name: string) {
    this.foodForm.get('name')?.setAsyncValidators([AsyncValidators.checkNameForEdition(name, this.validatorService, resources.foods)])
  }
  private setValidatorsForCreation() {
    this.foodForm.get('name')?.setAsyncValidators([AsyncValidators.checkName(this.validatorService, resources.foods)])
  }

  public submit() {
    if(this.foodForm.valid)
      this.dialogRef.close({ food: this.foodForm.value, foodId: this.foodId });
  }

  public close() {
    this.dialogRef.close();
  }
}
