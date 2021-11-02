export interface FoodProperties {
    'referenceMeasurements': {
        'referenceMassInGrams': number,
        'referenceVolumeInMililiters': number,
        'referenceUnits': number
    };
    'fattyAcidsAndCholesterol': {
        'saturatedFat': number,
        'monounsaturatedFat': number,
        'polyunsaturatedFat': number,
        'cholesterol': number
    };
    'macronutrients': {
        'calories': number,
        'protein': number,
        'carbohydrates': number,
        'grease': number,
        'fiber': number
    };
    'minerals': {
        'calcium': number,
        'iron': number,
        'sodium': number,
        'phosphorus': number,
        'iodo': number,
        'zinc': number,
        'manganese': number,
        'potassium': number
    };
    'vitamins': {
        'thiamin': number,
        'riboflavin': number,
        'niacin': number,
        'folates': number,
        'vitaminB12': number,
        'vitaminC': number,
        'vitaminA': number
    }
}