/**
 * Defines the structure of simple operations.
 */
type simpleOp =
    { "="?: number | string | unknown } |
    { ">"?: number | string | unknown } |
    { "<"?: number | string | unknown } |
    { ">="?: number | string | unknown } |
    { "<="?: number | string | unknown } |
    { "!="?: number | string | unknown }

export interface simpleOperation {
    [field_name: string]: simpleOp | simpleOp[] | unknown
}

/**
 * Processes simple operation conditions.
 * @param conditions The conditions to process.
 * @param subOperator The sub-operator to use.
 * @param type The type of condition.
 * @returns The processed SQL condition string.
 */
export declare function processSimpleOperationConditions({
    conditions,
    subOperator,
    type
}: {
    conditions: any,
    subOperator: string,
    type: string
}): string;

interface simpleOperationConditionType extends simpleOperation {
    "$and"?: simpleOperation,
    "$or"?: simpleOperation,
}

/**
 * Converts simple operation conditions to SQL format.
 * @param condition The condition to convert.
 * @param subOperator The sub-operator to use.
 * @returns The SQL condition string.
 */
export declare function simpleOperationConditions(condition: simpleOperationConditionType | unknown, subOperator?: string): string;
