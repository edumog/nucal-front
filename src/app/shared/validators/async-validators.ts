import { AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators";

import { ValidatorService } from "@base/app/core/services/validators/validator.service";
import { resources } from '@core/enums';

export class AsyncValidators {

   static checkName(validatorService: ValidatorService, resource: resources.foodCategories | resources.foods) {
      return (control: AbstractControl) => {
         return validatorService.getByName(resource, control.value).pipe(
            map(response => {
               return response ? { nameNotAvailable: true } : null;
            })
         );
      };
   }

   static checkNameForEdition(currentCategoryName: string, validatorService: ValidatorService, resource: resources.foodCategories | resources.foods) {
      return (control: AbstractControl) => {
         return validatorService.getByName(resource, control.value).pipe(
            map(response => {
               return (response && (control.value.trim() !== currentCategoryName.trim())) ? { nameNotAvailable: true } : null;
            })
         );
      };
   }
}