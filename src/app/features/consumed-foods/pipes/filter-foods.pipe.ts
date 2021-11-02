import { Pipe, PipeTransform } from '@angular/core';
import { FoodsCombo } from '@base/app/core/interfaces/dtos/food-categories-combobox.dto';

@Pipe({
  name: 'filterFoods'
})
export class FilterFoodsPipe implements PipeTransform {

  transform(value: FoodsCombo[], args: string[]): FoodsCombo[] | null {
    if (args)
      return this.applyFilter(value, args)
    return value;
  }
  private applyFilter(value: FoodsCombo[], args: string[]): FoodsCombo[] | null {
    if (args.length === 0)
      return (value)
    else {
      return this.filter(value, args);
    }
  }
  private filter(foods: FoodsCombo[], categories: string[]) {
    let result: FoodsCombo[] = [];
    categories.forEach(category => {
      result = result.concat(foods.filter(x => x.categories.includes(category)));
    });
    return this.removeRepeated(result);
  }
  private removeRepeated(result: FoodsCombo[]) {
    return result.filter((item, index) => result.indexOf(item) === index);
  }
}
