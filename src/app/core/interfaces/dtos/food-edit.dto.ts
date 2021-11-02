import { FoodProperties } from "./food-properties.dto";

export interface FoodEdit extends FoodProperties {
    name: string;
    categories: string[];
}