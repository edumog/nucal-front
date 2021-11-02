import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';

import { FoodProperties } from '@core/interfaces/dtos/food-properties.dto';
import { Plate } from '@core/interfaces/dtos/plate.dto';
import { NutritionalCalculator } from '@core/utilities/nutritional-calculator';
import { macronutrientGraphColors } from '@consumed-foods/enums';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements OnInit, OnChanges {

  @Input() plates: Array<Plate>;
  @Input() consumedFood: FoodWithDetails | null;
  public result: FoodProperties;
  public single: any[];
  public label: string = 'Total Gr'
  public colorScheme = {
    name: 'custom',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: [
      macronutrientGraphColors.proteinColor, 
      macronutrientGraphColors.carbohydratesColor, 
      macronutrientGraphColors.greaseColor, 
      macronutrientGraphColors.fiberColor
    ]
  };
  public data: { 
    macronutrients: { name: string, value: string | number | unknown }[],
    calories: number 
  };

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTotalConsumed();
  }

  private getTotalConsumed() {
    this.plates = this.consumedFood ? [{ numberOfPlate: 0, foods: [this.consumedFood]}] : this.plates;
    this.result = NutritionalCalculator.calculateTotalConsumption(this.plates);
    this.getChartValues();
  }

  public getChartValues() {
    this.data = {
      macronutrients: this.setValues(this.getMacronutrientsForChart()),
      calories: this.result.macronutrients.calories
    }
  }
  getMacronutrientsForChart() {
    return { 
      protein: this.result.macronutrients.protein,
      carbohydrates: this.result.macronutrients.carbohydrates,
      grease: this.result.macronutrients.grease,
      fiber: this.result.macronutrients.fiber
    }
  }
  private setValues(object: any) {
    const values: { name: string, value: string | number | unknown }[] = [];
    Object.keys(object).forEach((propertieName, index) => {
      values.push({ name: propertieName, value: Object.values(object)[index]})

    });
    return values;
  }
}
