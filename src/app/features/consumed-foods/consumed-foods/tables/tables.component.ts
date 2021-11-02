import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { FoodWithDetails } from '@core/interfaces/dtos/food-with-details.dto';
import { Plate } from '@core/interfaces/dtos/plate.dto';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.sass']
})
export class TablesComponent implements OnInit, OnChanges {

  @Input() plates: Array<Plate>;
  @Output() erasedPlate: EventEmitter<{ index: number }> = new EventEmitter();
  @Output() erasedFood: EventEmitter<{ plateIndex: number, foodIndex: number }> = new EventEmitter();
  @Output() editedFoodQuantity: EventEmitter<{ plateIndex: number, foodIndex: number, editedValue: number, unitMeasurementIndex: number }> = new EventEmitter();
  public displayedColumns: Array<string> = ['name', 'unitMeasurement', 'quantity', 'actions'];
  private unitMeasurements: string[] = ['Gramos', 'Mililitros', 'Unidades'];
  public consumedValues: { values: { unitMeasurement: string, value: number }[] }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.consumedValues = [];
    this.getQuantityDataTable();
  }

  private getQuantityDataTable() {
    this.plates.forEach((plate, index) => {
      this.consumedValues.push({ values: [] });
      this.getValuesFromFoods(plate.foods, index)
    });
  }
  private getValuesFromFoods(foods: FoodWithDetails[], plateIndex: number) {
    foods.forEach(food => {
      this.consumedValues[plateIndex].values.push(this.getValueFromFood(food));
      this.getValueFromFood(food);
    });
  }
  private getValueFromFood(food: FoodWithDetails) {
    const response = { unitMeasurement: '', value: 0 }
    for(let [index, value] of Object.values(food.referenceMeasurements).entries()) {
      if(value > 0) {
        response.unitMeasurement = this.unitMeasurements[index];
        response.value = value;
        break;
      }
    };
    return response;
  }

  public deletePlate(index: number) {
    this.erasedPlate.emit({ index });
  }

  public deleteFood(foodIndex: number, plateIndex: number) {
    this.erasedFood.emit({ plateIndex, foodIndex });
  }
  
  public editQuantity(event: any, unitMeasurement: string, foodIndex: number, plateIndex: number) {
    this.editedFoodQuantity.emit({
      plateIndex, 
      foodIndex,
      editedValue: event.target.value,
      unitMeasurementIndex: this.unitMeasurements.indexOf(unitMeasurement)
    })

  }
}
