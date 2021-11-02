import { Food } from "../models/food.interface";
import { FoodProperties } from "./food-properties.dto";

export interface FoodWithDetails extends FoodProperties, Food {
}