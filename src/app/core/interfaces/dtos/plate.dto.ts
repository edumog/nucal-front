import { FoodWithDetails } from "./food-with-details.dto";

export interface Plate {
    numberOfPlate: number,
    foods: Array<FoodWithDetails>
}