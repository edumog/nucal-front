import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';

import { consumedFoodsViewParameters } from '@consumed-foods/enums';
import { Combobox } from '@core/interfaces/dtos/combobox.dto';
import { FoodsCombo } from '@core/interfaces/dtos/food-categories-combobox.dto';

@Component({
  selector: 'app-food-selection',
  templateUrl: './food-selection.component.html',
  styleUrls: ['./food-selection.component.sass']
})
export class FoodSelectionComponent implements OnInit, OnChanges {

  @Input() foodCategories : Combobox[] | null;
  @Input() foods : FoodsCombo[] | null;
  @Input() selectedFood: FoodWithDetails | null | undefined;
  @Output() foodId : EventEmitter<string> = new EventEmitter<string>();
  public parameters = consumedFoodsViewParameters;
  public categoriesControl : FormControl = new FormControl();
  public foodsControl : FormControl = new FormControl(); 
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.cleanForm();
  }

  private cleanForm() {
    if(!this.selectedFood){
      this.cleanCategories();
      this.cleanFoods();
    }
  }

  public selectFood(foodId: any) {
    this.foodId.emit(foodId);
  }

  public cleanCategories() {
    this.cleanControl(this.categoriesControl);
    this.categoriesChanged();
  }  
  public categoriesChanged() {
    this.cleanControl(this.foodsControl);
    this.foodId.emit();
  }

  public cleanFoods() {
    this.cleanControl(this.foodsControl);
    this.selectFood(this.foodsControl.value);
    this.foodId.emit();
  }

  private cleanControl(control: FormControl) {
    control.setValue('');
  }
}
