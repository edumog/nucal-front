import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { CombosFacadeService } from '@base/app/shared/services/combos-facade.service';
import { FoodEdit } from '@base/app/core/interfaces/dtos/food-edit.dto';
import { FoodWithDetails } from '@base/app/core/interfaces/dtos/food-with-details.dto';
import { Food } from '@core/interfaces/models/food.interface';
import { foodsParameters } from '../enums';
import { EditModalComponent } from '@foods/foods/edit-modal/edit-modal.component';
import { FoodFacadeService } from '../services/food-facade.service';
import * as fromActions from '../store/foods.actions';
import { ConfirmationDialogComponent } from '@shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.sass']
})
export class FoodsComponent implements OnInit {

  public parameters = foodsParameters;
  private foodCategoriesCombo$ = this.combosService.getFoodCategoriesCombo$();
  public foodCategoriesCombo: { id: string, name: string };
  public foods$: Observable<Food[]> = this.store.getFoods();
  public food$: Observable<FoodWithDetails | undefined | null> = this.store.getCurrentFood();
  public food: FoodWithDetails | null = null;
  public dataSource: Food[];
  private isFoodLoading$: Observable<boolean> = this.store.getLoadState();
  public isFoodLoading: boolean = false;
  public displayedColumns: string[] = ['name', 'actions'];

  constructor(private store: FoodFacadeService, private combosService: CombosFacadeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.store.loadFoods();
    this.combosService.getFoodCategoriesCombo();
    this.makeSubscriptions();
  }

  private makeSubscriptions() {
    this.foodCategoriesCombo$.subscribe((response: any) => response ? this.foodCategoriesCombo = response : null);
    this.foods$.subscribe((foods: any) => foods ? this.dataSource = foods : null);
    this.isFoodLoading$.subscribe((isLoading: boolean) => this.isFoodLoading = isLoading);
    this.food$.subscribe((food: any) => this.food = food)
  }

  public openEditModal(food: Food | null = null): void {
    if (food)
      this.store.loadFood(food.id);
    const dialogRef = this.dialog.open(
      EditModalComponent,
      {
        width: '90%',
        data: { combo: this.foodCategoriesCombo, food: this.food$, isFoodLoading: this.isFoodLoading$ }
      });
    dialogRef.afterClosed().subscribe((response: { food: FoodEdit, foodId: string }) => {
      this.handleCloseModal(response);
      this.store.removeCurrentFood();
    });
  }
  private handleCloseModal(response: { food: FoodEdit; foodId: string; }) {
    if (response) {
      this.saveChanges(response.food, response.foodId);
    }
  }
  private saveChanges(food: FoodEdit, foodId: string) {
    if (food && food.name)
      (!foodId) ? this.createFood(food) : this.updateFood(food, foodId);
  }
  private createFood(food: FoodEdit) {
    this.store.createFood(food);
  }
  private updateFood(editedFood: FoodEdit, foodId: string) {
    const food: FoodWithDetails = { ...editedFood, id: foodId };
    this.store.updateFood(food);
  }

  public delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: foodsParameters.deleteConfirmationMessage } });
    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.store.deleteFood(id);
      }
    })
  }
}
