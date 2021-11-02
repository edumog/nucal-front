import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular material imports */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule}  from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from './components/dialogs/information-dialog/information-dialog.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { CombosEffects } from './store/effects/combos.effects';
import { combosReducer } from './store/reducers/combos.reducer';
import { combosFeatureKey } from './store/selectors/combos-selectors';

/** Components */
const Components = [
  FormErrorsComponent
]
/** Mat components */
const MatComponents = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule 
];

/** Modules */
const Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
]

@NgModule({
  declarations: [ConfirmationDialogComponent, InformationDialogComponent, FormErrorsComponent],
  imports: [
    ...Modules,
    ...MatComponents,
    StoreModule.forFeature(combosFeatureKey, combosReducer),
    EffectsModule.forFeature([CombosEffects])
  ],
  exports: [
    ...Modules,
    ...MatComponents,
    ...Components,

  ]
})
export class SharedModule { }
