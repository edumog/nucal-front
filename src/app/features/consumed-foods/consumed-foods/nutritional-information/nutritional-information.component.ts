import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Plate } from '@base/app/core/interfaces/dtos/plate.dto';
import { DailyConsumption } from '@base/app/core/interfaces/models/daily-consumption.interface';
import { User } from '@base/app/core/interfaces/models/user.interface';

import { FoodWithDetails } from '@core/interfaces/dtos/food-with-details.dto';
import { NutritionalCalculator } from '@core/utilities/nutritional-calculator';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-nutritional-information',
  templateUrl: './nutritional-information.component.html',
  styleUrls: ['./nutritional-information.component.sass']
})
export class NutritionalInformationComponent implements OnChanges, OnInit {

  @Input() currentConsumption: DailyConsumption | null;
  @Input() $currentFood: Observable<FoodWithDetails | null | undefined>;
  @Input() currentFood: FoodWithDetails | null | undefined;
  @Input() foodLoadState: boolean | null;
  @Input() user: User | null | undefined;
  @Output() currentFoodId: EventEmitter<string> = new EventEmitter<string>();
  @Output() editedDailyConsumption: EventEmitter<{ dailyConsumption: DailyConsumption, itsForCreation: boolean }> = new EventEmitter<{ dailyConsumption: DailyConsumption, itsForCreation: boolean }>();
  public consumedFood: { food: FoodWithDetails | null, numberOfPlate: number } = { food: null, numberOfPlate: 0 };
  public panelInformationOpenState: boolean = true;
  public panelListOpenState: boolean = false;
  private currentFoodSubscribe: Subscription;
  private unitMeasurements: Array<string> = ['referenceMassInGrams', 'referenceVolumeInMililiters', 'referenceUnits'];

  constructor() { }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
  }

  public checkReferenceMeasurement(referenceMeasurements: number): boolean {
    return (parseFloat(referenceMeasurements.toString()) > 0);
  }

  public getNutritionalInformation(values: { referenceMeasurements: string, quantity: number, numberOfPlate: number }) {
    const referenceMeasurementValue = this.getReferenceMeasurementValue(values.referenceMeasurements);
    this.consumedFood = {
      food: NutritionalCalculator.getConsumedFood(values.referenceMeasurements, referenceMeasurementValue, values.quantity, this.currentFood),
      numberOfPlate: values.numberOfPlate
    };
  }
  private getReferenceMeasurementValue(selectedReferenceMeasurement: string) {
    const referenceValues = this.getReferenceMeasurements();
    return referenceValues ? referenceValues[selectedReferenceMeasurement] : null;
  }
  private getReferenceMeasurements(): any {
    return this.currentFood ? this.currentFood['referenceMeasurements'] : null;
  }

  public saveChanges() {
    !this.currentConsumption?.date ? 
      this.createConsumption(this.consumedFood?.food, this.consumedFood.numberOfPlate) : 
      this.editConsumption(this.currentConsumption, this.consumedFood?.food, this.consumedFood.numberOfPlate);
    this.consumedFood = { food: null, numberOfPlate: 0 };
    this.currentFoodId.emit();

  }
  private createConsumption(consumedFood: FoodWithDetails | null | undefined, numberOfPlate: number) {
    this.editedDailyConsumption.emit(
      {
        dailyConsumption: {
          date: new Date().toDateString(),
          userId: this.user?.id || '',
          plates: [{
            numberOfPlate: numberOfPlate,
            foods: consumedFood ? [consumedFood] : []
          }]
        },
        itsForCreation: true
      });
  }
  private editConsumption(currentConsumption: DailyConsumption, consumedFood: FoodWithDetails | null | undefined, numberOfPlate: number) {
    const plates: Array<Plate> = consumedFood ? this.editPlates([...currentConsumption.plates], numberOfPlate, consumedFood) : currentConsumption.plates;
    this.edit(plates, currentConsumption);
  }
  private editPlates(plates: Plate[], numberOfPlate: number, consumedFood: FoodWithDetails): Array<Plate> {
    let currentPlate = plates.find(x => x.numberOfPlate === numberOfPlate);
    currentPlate ? plates = this.editExistingPlate(plates, currentPlate, consumedFood, plates.indexOf(currentPlate))
      : plates.push({ numberOfPlate, foods: [consumedFood] });
    return plates;
  }
  private editExistingPlate(plates: Plate[], currentPlate: Plate, consumedFood: FoodWithDetails, index: number) {
    const foods = this.editFoods(consumedFood, [...currentPlate.foods]);
    return this.updatePlate(plates, { ...currentPlate, foods }, index);
  }

  private editFoods(consumedFood: FoodWithDetails, foods: Array<FoodWithDetails>): Array<FoodWithDetails> {
    const foodAux = foods.find(x => x.id === consumedFood.id);
    foodAux ? foods[foods.indexOf(foodAux)] = consumedFood : foods.push(consumedFood);
    return foods;
  }

  public editQuantity(event: { plateIndex: number, foodIndex: number, editedValue: number, unitMeasurementIndex: number }, currentConsumption: DailyConsumption) {
    this.currentFoodId.emit();
    this.currentFoodId.emit(currentConsumption.plates[event.plateIndex].foods[event.foodIndex].id);
    const plate = currentConsumption.plates[event.plateIndex];
    const consumedFood = currentConsumption.plates[event.plateIndex].foods[event.foodIndex];
    this.subscribeToCurrentFood(plate, consumedFood, event.editedValue, event.unitMeasurementIndex, currentConsumption);
  }
  private subscribeToCurrentFood(plate: Plate, consumedFood: FoodWithDetails, editedValue: number, unitMeasurementIndex: number, currentConsumption: DailyConsumption) {
    this.currentFoodSubscribe = this.$currentFood.subscribe((selectedFood: FoodWithDetails | null | undefined) => {
      this.currentFood = selectedFood;
      if (selectedFood && consumedFood && selectedFood.id === consumedFood.id) {
        this.setEditedPlates(unitMeasurementIndex, editedValue, selectedFood, plate, currentConsumption)
        this.currentFoodSubscribe.unsubscribe();
        this.currentFoodId.emit();
      }
    });
  }
  private setEditedPlates(unitMeasurementIndex: number, editedValue: number, currentFood: FoodWithDetails, plate: Plate, currentConsumption: DailyConsumption) {
    const referenceValue = this.getReferenceMeasurementValue(this.unitMeasurements[unitMeasurementIndex]);
    const consumedFood = NutritionalCalculator.getConsumedFood(this.unitMeasurements[unitMeasurementIndex], referenceValue, editedValue, currentFood);
    let plates = currentConsumption.plates ? [...currentConsumption.plates] : [];
    plates = consumedFood ? this.editPlates(plates, plate.numberOfPlate, consumedFood) : plates;
    this.edit(plates, currentConsumption);
  }

  public deletePlate(indexPlate: number, plates: Plate[], currentConsumption: DailyConsumption) {
    const plate = plates[indexPlate];
    plates = this.removePlateFromArray([...plates], plate);
    this.edit(plates, currentConsumption);
  }
  private removePlateFromArray(plates: Plate[], plate: Plate): Plate[] {
    plates.splice(plates.indexOf(plate), 1);
    return plates;
  }

  public deleteFood(event: { plateIndex: number, foodIndex: number }, currentConsumption: DailyConsumption) {
    const plate = { ...currentConsumption.plates[event.plateIndex] };
    plate.foods = this.removeFood(plate, event.foodIndex);
    const plates = this.updatePlate([...currentConsumption.plates], plate, event.plateIndex);
    this.edit(plates, currentConsumption);
  }
  private removeFood(plate: Plate, foodIndex: number): FoodWithDetails[] {
    let foods = [...plate.foods];
    foods.splice(foodIndex, 1);
    return foods;
  }

  private updatePlate(plates: Plate[], plate: Plate, plateIndex: number): Plate[] {
    plates[plateIndex] = plate;
    return plates;
  }

  public edit(plates: Array<Plate>, currentConsumption: DailyConsumption) {
    this.editedDailyConsumption.emit({
      dailyConsumption: { ...currentConsumption, plates, userId: this.user?.id || '' },
      itsForCreation: false
    });
  }
}
