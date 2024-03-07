/**
 * Defines the structure for the "between" condition in a SQL query.
 */
export type BetweenCondition = {
    [field_name: string]: {
        "$from": string | number,
        "$to": string | number,
    }
}

/**
 * Defines the structure for the between condition type, which includes "$between" and "$not_between".
 */
export interface BetweenConditions {
    "$between"?: BetweenCondition | {
        "$or"?: BetweenCondition,
        "$and"?: BetweenCondition
    },
    "$not_between"?: BetweenCondition | {
        "$or"?: BetweenCondition,
        "$and"?: BetweenCondition
    },
}

/**
 * Processes the "between" conditions recursively to generate SQL statements.
 * @param conditions The "between" conditions to be processed.
 * @param operatorKeyword The keyword for the SQL operator, if any.
 * @param subOperator The sub-operator for combining conditions.
 * @returns The processed SQL conditions.
 */
export declare function processBetweenConditions(
    conditions: BetweenCondition | { "$or"?: BetweenCondition, "$and"?: BetweenCondition },
    operatorKeyword: string,
    subOperator: string
): string;

/**
 * Generates SQL conditions for the "between" type.
 * @param condition The "between" conditions to be processed.
 * @param subOperator The sub-operator for combining conditions.
 * @returns The SQL conditions for the "between" type.
 */
export declare function betweenConditions(condition: BetweenConditions, subOperator?: string): string;
