/**
 * Defines the structure of the "between" condition object.
 */
export type between = {
    [field_name: string]: {
        "$from": string | number,
        "$to": string | number,
    }
}

/**
 * Defines the structure of the "betweenType" interface.
 */
export interface betweenType {
    "$between"?: between | {
        "$or"?: between,
        "$and"?: between
    },
    "$not_between"?: between | {
        "$or"?: between,
        "$and"?: between
    },
}

/**
 * Processes pattern conditions recursively.
 * @param conditions - The between or pattern condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated pattern conditions as a string.
 */
export function processBetweenConditions(
    conditions: between | {
        "$or"?: between,
        "$and"?: between
    },
    operatorKeyword: string,
    subOperator: string
): string;

/**
 * Generates SQL-like BETWEEN conditions based on the provided input.
 * @param condition - The betweenType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated BETWEEN conditions as a string.
 */
export function BetweenConditions(
    condition: betweenType,
    subOperator?: string
): string;
