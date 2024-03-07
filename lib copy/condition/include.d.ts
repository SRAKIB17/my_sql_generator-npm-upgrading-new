/**
 * Defines the structure of the "$include" condition object.
 */
export type $include = {
    [field_name: string]: string[] | number[] | any[],
}

/**
 * Defines the structure of the "includeType" interface.
 */
export interface includeType {
    "$not_include"?: {
        "$or"?: $include,
        "$and"?: $include,
    } | $include,
    "$include"?: {
        "$or"?: $include,
        "$and"?: $include,
    } | $include,
}

/**
 * Processes include conditions recursively.
 * @param conditions - The include condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated include conditions as a string.
 */
export function processIncludeConditions(
    conditions: {
        "$or"?: $include,
        "$and"?: $include,
    } | $include, operatorKeyword: string, subOperator: string): string;

/**
 * Generates SQL-like INCLUDE conditions based on the provided input.
 * @param condition - The includeType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated INCLUDE conditions as a string.
 */
export function includeConditions(
    condition: includeType,
    subOperator?: string
): string;
