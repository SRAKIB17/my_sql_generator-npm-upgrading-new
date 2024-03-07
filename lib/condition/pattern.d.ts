/**
 * Defines the structure of the "patternType" interface.
 */
export interface patternType {
    "$pattern"?: {
        [field_name: string]: string |
        {
            "$or"?: {
                [field_name: string]: string
            },
            "$and"?: {
                [field_name: string]: string
            }
        }
    },
    "$not_pattern"?: {
        [field_name: string]: string |
        {
            "$or"?: {
                [field_name: string]: string
            },
            "$and"?: {
                [field_name: string]: string
            }
        }
    }
}

/**
 * Processes pattern conditions recursively.
 * @param conditions - The pattern condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated pattern conditions as a string.
 */
export function processPatternConditions(
    conditions: {
        [field_name: string]: string |
        {
            "$or"?: {
                [field_name: string]: string
            },
            "$and"?: {
                [field_name: string]: string
            }
        }
    }, operatorKeyword: string, subOperator: string): string;

/**
 * Generates SQL-like PATTERN conditions based on the provided input.
 * @param condition - The patternType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated PATTERN conditions as a string.
 */
export function PatternConditions(
    condition: patternType,
    subOperator?: string
): string;
