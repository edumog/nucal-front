import { FoodProperties } from "../interfaces/dtos/food-properties.dto";
import { FoodWithDetails } from "../interfaces/dtos/food-with-details.dto";
import { Plate } from "../interfaces/dtos/plate.dto";

export class NutritionalCalculator {

    public static getConsumedFood(referenceMeasurement: string, referenceMeasurementValue: number, amountConsumed: number, currentFood: FoodWithDetails | null | undefined) {
        let consumedFood: FoodWithDetails | null = null;
        if (currentFood) {
            consumedFood = {
                ...currentFood,
                referenceMeasurements: this.setReferenceMeasurement(referenceMeasurement, amountConsumed),
                fattyAcidsAndCholesterol: this.setFattyAcidsAndCholesterol(currentFood.fattyAcidsAndCholesterol, referenceMeasurementValue, amountConsumed),
                macronutrients: this.setMacronutrients(currentFood.macronutrients, referenceMeasurementValue, amountConsumed),
                minerals: this.setMinerals(currentFood.minerals, referenceMeasurementValue, amountConsumed),
                vitamins: this.setVitamins(currentFood.vitamins, referenceMeasurementValue, amountConsumed)
            }
        }
        return consumedFood;
    }

    private static setReferenceMeasurement(selectedReferenceMeasurement: string, amountConsumed: number): { referenceMassInGrams: number, referenceVolumeInMililiters: number, referenceUnits: number } {
        const referenceMeasurements = {
            referenceMassInGrams: (selectedReferenceMeasurement === 'referenceMassInGrams') ? amountConsumed : 0,
            referenceVolumeInMililiters: (selectedReferenceMeasurement === 'referenceVolumeInMililiters') ? amountConsumed : 0,
            referenceUnits: (selectedReferenceMeasurement === 'referenceUnits') ? amountConsumed : 0
        }
        return referenceMeasurements;
    }
    private static setFattyAcidsAndCholesterol(fattyAcidsAndCholesterol: any, referenceValue: number, amount: number) {
        return {
            saturatedFat: this.calculateAmountPresent(fattyAcidsAndCholesterol.saturatedFat, referenceValue, amount),
            monounsaturatedFat: this.calculateAmountPresent(fattyAcidsAndCholesterol.monounsaturatedFat, referenceValue, amount),
            polyunsaturatedFat: this.calculateAmountPresent(fattyAcidsAndCholesterol.polyunsaturatedFat, referenceValue, amount),
            cholesterol: this.calculateAmountPresent(fattyAcidsAndCholesterol.cholesterol, referenceValue, amount)
        }
    }
    private static setMacronutrients(macronutrients: any, referenceValue: number, amount: number) {
        return {
            calories: this.calculateAmountPresent(macronutrients.calories, referenceValue, amount),
            protein: this.calculateAmountPresent(macronutrients.protein, referenceValue, amount),
            carbohydrates: this.calculateAmountPresent(macronutrients.carbohydrates, referenceValue, amount),
            grease: this.calculateAmountPresent(macronutrients.grease, referenceValue, amount),
            fiber: this.calculateAmountPresent(macronutrients.fiber, referenceValue, amount)
        }
    }
    private static setMinerals(minerals: any, referenceValue: number, amount: number) {
        return {
            calcium: this.calculateAmountPresent(minerals.calcium, referenceValue, amount),
            iron: this.calculateAmountPresent(minerals.iron, referenceValue, amount),
            sodium: this.calculateAmountPresent(minerals.sodium, referenceValue, amount),
            phosphorus: this.calculateAmountPresent(minerals.phosphorus, referenceValue, amount),
            iodo: this.calculateAmountPresent(minerals.iodo, referenceValue, amount),
            zinc: this.calculateAmountPresent(minerals.zinc, referenceValue, amount),
            manganese: this.calculateAmountPresent(minerals.manganese, referenceValue, amount),
            potassium: this.calculateAmountPresent(minerals.potassium, referenceValue, amount)
        }
    }
    private static setVitamins(vitamins: any, referenceValue: number, amount: number) {
        return {
            thiamin: this.calculateAmountPresent(vitamins.thiamin, referenceValue, amount),
            riboflavin: this.calculateAmountPresent(vitamins.riboflavin, referenceValue, amount),
            niacin: this.calculateAmountPresent(vitamins.niacin, referenceValue, amount),
            folates: this.calculateAmountPresent(vitamins.folates, referenceValue, amount),
            vitaminB12: this.calculateAmountPresent(vitamins.vitaminB12, referenceValue, amount),
            vitaminC: this.calculateAmountPresent(vitamins.vitaminC, referenceValue, amount),
            vitaminA: this.calculateAmountPresent(vitamins.vitaminA, referenceValue, amount)
        }
    }

    private static calculateAmountPresent(nutrient: number, referenceMeasurement: number, amountConsumed: number): number {
        return ((nutrient / referenceMeasurement) * amountConsumed);
    }

    public static calculateTotalConsumption(plates: Array<Plate>): FoodProperties {
        let result = {
            referenceMeasurements: {
                referenceMassInGrams: 0,
                referenceVolumeInMililiters: 0,
                referenceUnits: 0
            },
            fattyAcidsAndCholesterol: {
                saturatedFat: 0,
                monounsaturatedFat: 0,
                polyunsaturatedFat: 0,
                cholesterol: 0
            },
            macronutrients: {
                calories: 0,
                protein: 0,
                carbohydrates: 0,
                grease: 0,
                fiber: 0
            },
            minerals: {
                calcium: 0,
                iron: 0,
                sodium: 0,
                phosphorus: 0,
                iodo: 0,
                zinc: 0,
                manganese: 0,
                potassium: 0
            },
            vitamins: {
                thiamin: 0,
                riboflavin: 0,
                niacin: 0,
                folates: 0,
                vitaminB12: 0,
                vitaminC: 0,
                vitaminA: 0
            }
        }
        plates.forEach(plate => {
            result = this.addNutrients(result, plate.foods)
        });
        return result;
    }
    private static addNutrients(result: FoodProperties, foods: Array<FoodWithDetails>) {

        foods.forEach(food => {
            result.referenceMeasurements.referenceMassInGrams = (result.referenceMeasurements.referenceMassInGrams + food.referenceMeasurements.referenceMassInGrams);
            result.referenceMeasurements.referenceVolumeInMililiters = (result.referenceMeasurements.referenceVolumeInMililiters + food.referenceMeasurements.referenceVolumeInMililiters);
            result.referenceMeasurements.referenceUnits = (result.referenceMeasurements.referenceUnits + food.referenceMeasurements.referenceUnits);
            result.fattyAcidsAndCholesterol.saturatedFat = (result.fattyAcidsAndCholesterol.saturatedFat + food.fattyAcidsAndCholesterol.saturatedFat);
            result.fattyAcidsAndCholesterol.monounsaturatedFat = (result.fattyAcidsAndCholesterol.monounsaturatedFat + food.fattyAcidsAndCholesterol.monounsaturatedFat);
            result.fattyAcidsAndCholesterol.polyunsaturatedFat = (result.fattyAcidsAndCholesterol.polyunsaturatedFat + food.fattyAcidsAndCholesterol.polyunsaturatedFat);
            result.fattyAcidsAndCholesterol.cholesterol = (result.fattyAcidsAndCholesterol.cholesterol + food.fattyAcidsAndCholesterol.cholesterol);
            result.macronutrients.calories = (result.macronutrients.calories + food.macronutrients.calories);
            result.macronutrients.protein = (result.macronutrients.protein + food.macronutrients.protein);
            result.macronutrients.carbohydrates = (result.macronutrients.carbohydrates + food.macronutrients.carbohydrates);
            result.macronutrients.fiber = (result.macronutrients.fiber + food.macronutrients.fiber);
            result.macronutrients.grease = (result.macronutrients.grease + food.macronutrients.grease);
            result.minerals.calcium = (result.minerals.calcium + food.minerals.calcium);
            result.minerals.iron = (result.minerals.iron + food.minerals.iron);
            result.minerals.sodium = (result.minerals.sodium + food.minerals.sodium);
            result.minerals.phosphorus = (result.minerals.phosphorus + food.minerals.phosphorus);
            result.minerals.iodo = (result.minerals.iodo + food.minerals.iodo);
            result.minerals.zinc = (result.minerals.zinc + food.minerals.zinc);
            result.minerals.manganese = (result.minerals.manganese + food.minerals.manganese);
            result.minerals.potassium = (result.minerals.potassium + food.minerals.potassium);
            result.vitamins.thiamin = (result.vitamins.thiamin + food.vitamins.thiamin);
            result.vitamins.riboflavin = (result.vitamins.riboflavin + food.vitamins.riboflavin);
            result.vitamins.niacin = (result.vitamins.niacin + food.vitamins.niacin);
            result.vitamins.folates = (result.vitamins.folates + food.vitamins.folates);
            result.vitamins.vitaminB12 = (result.vitamins.vitaminB12 + food.vitamins.vitaminB12);
            result.vitamins.vitaminC = (result.vitamins.vitaminC + food.vitamins.vitaminC);
            result.vitamins.vitaminA = (result.vitamins.vitaminA + food.vitamins.vitaminA); 
        });
        return result
    }
}