import { FilterFoodsPipe } from './filter-foods.pipe';

describe('FilterFoodsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterFoodsPipe();
    expect(pipe).toBeTruthy();
  });
});
