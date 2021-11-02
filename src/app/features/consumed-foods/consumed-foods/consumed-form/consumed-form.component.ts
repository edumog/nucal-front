import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';

@Component({
  selector: 'app-consumed-form',
  templateUrl: './consumed-form.component.html',
  styleUrls: ['./consumed-form.component.sass']
})
export class ConsumedFormComponent implements OnInit {

  @Input() currentFood: FoodWithDetails | null | undefined; 
  @Output() formValues: EventEmitter<{ referenceMeasurements: string, quantity: number, numberOfPlate: number }> = new EventEmitter();
  public foodConsumedForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.setForm();
  }

  ngOnChanges(): void {
    if (this.foodConsumedForm) this.configureControls();
  }

  setForm() {
    this.foodConsumedForm = new FormGroup({
      referenceMeasurements: new FormControl(''),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      numberOfPlate: new FormControl(0, [Validators.required, Validators.min(1)])
    });
    this.configureControls();
  }

  private configureControls() {
    this.enableOrDisable((!this.currentFood), 'referenceMeasurements');
    if (!this.currentFood) this.foodConsumedForm.get('referenceMeasurements')?.setValue('');
    const selectedReference = this.foodConsumedForm.get('referenceMeasurements')?.value;
    const condition = (!selectedReference || selectedReference === "" || !this.currentFood);
    this.enableOrDisable(condition, 'quantity');
    this.enableOrDisable(condition, 'numberOfPlate');
  }

  public referenceUnitSelection() {
    const selectedReference = this.foodConsumedForm.get('referenceMeasurements')?.value;
    const condition = (!selectedReference || selectedReference === "" || !this.currentFood);
    this.enableOrDisable(condition, 'quantity');
    this.enableOrDisable(condition, 'numberOfPlate');
  }

  private enableOrDisable(condition: boolean | null, controlName: string) {
    condition ? this.foodConsumedForm.get(controlName)?.disable() : this.foodConsumedForm.get(controlName)?.enable();
  }

  public checkReferenceMeasurement(referenceMeasurements: number): boolean {
    return (parseFloat(referenceMeasurements.toString()) > 0);
  }

  public submitFormValues() {
    this.formValues.emit(this.foodConsumedForm.value)
    return this.foodConsumedForm.value;
  }
}
