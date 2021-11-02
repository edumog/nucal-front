import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FoodCategory } from '@core/interfaces/models/food-category.interface';
import { FoodCategoriesFacade } from '../services/food-categories-facade.service';
import { FoodCategoryEditDTO } from '@app/core/interfaces/dtos/food-category.edit.dto';
import { foodCategoriesParameters } from '@food-categories/enums';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { ConfirmationDialogComponent } from '@shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.sass']
})
export class FoodCategoriesComponent implements OnInit, OnDestroy {

  public parameters = foodCategoriesParameters;
  public foodCategories$: Observable<FoodCategory[]> = this.storefacade.getFoodCategories();
  public isLoading$: Observable<boolean> = this.storefacade.getLoadState();
  public isLoading: boolean = false;
  public dataSource: FoodCategory[];
  public displayedColumns: string[] = ['name', 'actions'];

  constructor(private storefacade: FoodCategoriesFacade, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadEntities();
    this.makeSubscriptions();
  }

  ngOnDestroy(): void {
    this.storefacade.clearStore();
    this.closeSubscriptions();
  }
  private closeSubscriptions() {
    this.foodCategories$.subscribe().closed;
    this.isLoading$.subscribe().closed;
  }

  private loadEntities(): void {
    this.storefacade.loadFoodCategories();
  }

  private makeSubscriptions(): void {
    this.foodCategories$.subscribe((response: FoodCategory[]) => this.dataSource = response);
    this.isLoading$.subscribe((response: boolean) => this.isLoading = response)
  }

  public create(foodCategory: FoodCategoryEditDTO): void {
    this.storefacade.createFoodCategory(foodCategory);
  }

  public edit(foodCategory: FoodCategory): void {
    this.storefacade.updateFoodCategory(foodCategory);
  }

  public delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title:foodCategoriesParameters.deleteConfirmationMessage }});
    dialogRef.afterClosed().subscribe((response: boolean) => {
      if(response) {
        this.storefacade.deleteFoodCategory(id);
      }
    })
  }

  public openEditModal(foodCategory: FoodCategory = { id: '', name: '' }): void {
    const dialogRef = this.dialog.open(EditModalComponent, { data: { foodCategory } });
    dialogRef.afterClosed().subscribe((foodCategory: FoodCategory) => {
      if(foodCategory){
        this.saveChanges(foodCategory);
      }
    });
  }
  private saveChanges(foodCategory: FoodCategory): void {
    if (foodCategory.id) {
      this.edit(foodCategory);
    } else if (foodCategory.name) {
      this.create({ name: foodCategory.name });
    }
  }
}
