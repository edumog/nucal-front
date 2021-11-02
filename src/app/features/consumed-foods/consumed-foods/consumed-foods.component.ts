import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';

import { DailyConsumption } from '@core/interfaces/models/daily-consumption.interface';
import { User } from '@core/interfaces/models/user.interface';
import { consumedFoodsViewParameters } from '../enums';
import { AccountFacadeService } from '@security/services/account-facade.service';
import { ConsumedFoodsFacadeService } from '../services/consumed-foods-facade.service';
import { CombosFacadeService } from '@shared/services/combos-facade.service';

@Component({
  selector: 'app-consumed-foods',
  templateUrl: './consumed-foods.component.html',
  styleUrls: ['./consumed-foods.component.sass']
})
export class ConsumedFoodsComponent implements OnInit, OnDestroy {

  public parameters = consumedFoodsViewParameters;
  public isLoading: boolean = false;
  public currentConsumption$ = this.consumedFoodsService.getCurrentConsumption$();
  public foodCategoriesCombo$ = this.combosService.getFoodCategoriesCombo$();
  public foodsCombo$ = this.combosService.getFoodsCombo$();
  public selectedFood$ = this.consumedFoodsService.getCurrentFood$();
  public isFoodLoading$: Observable<boolean> = this.consumedFoodsService.getLoadState$();
  public user$: Observable<User | null | undefined> = this.accountService.getUser();
  public userId: string = '';
  private isFoodCategoriesLoading$: Observable<boolean> = this.combosService.getLoadingIndicatorFoodCategories();
  private isFoodsLoading$: Observable<boolean> = this.combosService.getLoadingIndicatorFoods();

  constructor(private combosService: CombosFacadeService, private consumedFoodsService: ConsumedFoodsFacadeService, private accountService: AccountFacadeService) { }

  ngOnInit(): void {
    this.makeSubscriptions();
    this.getItemsFromComboBoxes();
    this.consumedFoodsService.getCurrentConsumption(this.userId);
  }

  ngOnDestroy(): void {
    this.consumedFoodsService.cleanCurrent();
  }

  private makeSubscriptions() {
    this.user$.subscribe((user: any) => user? this.userId = user.id : this.userId = '')
    this.subscribeToLoadIndicators();
  }
  getItemsFromComboBoxes() {
    this.combosService.getFoodCategoriesCombo();
    this.combosService.getFoodsCombo();
  }
  
  private subscribeToLoadIndicators() {
    combineLatest([this.isFoodCategoriesLoading$, this.isFoodsLoading$]).subscribe((value: any) => this.isLoading = (value[0] || value[1]));
  }

  public editDailyConsumption(consumption: { dailyConsumption: DailyConsumption, itsForCreation: boolean }) {
    (consumption.itsForCreation) ? this.consumedFoodsService.createConsumption(consumption.dailyConsumption) : this.consumedFoodsService.updateConsumption(consumption.dailyConsumption);
  }

  public selectFood(foodId: string | null) {
    !foodId ? this.consumedFoodsService.cleanCurrent() : this.consumedFoodsService.getFood(foodId);
  }
}
