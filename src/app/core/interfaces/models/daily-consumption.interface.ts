import { FoodWithDetails } from "../dtos/food-with-details.dto";
import { Plate } from "../dtos/plate.dto";

export interface DailyConsumption {
    id?: number;
    userId: string;
    date: string | '';
    plates: Array<Plate>;
}