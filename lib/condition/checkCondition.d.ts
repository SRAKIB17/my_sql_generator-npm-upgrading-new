
/**
 * Defines the structure of simple operations.
 */
export interface simpleOperation {
    "="?: { [field_name: string]: number | string | unknown },
    ">"?: { [field_name: string]: number | string | unknown },
    "<"?: { [field_name: string]: number | string | unknown },
    ">="?: { [field_name: string]: number | string | unknown },
    "<="?: { [field_name: string]: number | string | unknown },
    "!="?: { [field_name: string]: number | string | unknown }
}

/**
 * Regular expression for identifying simple operations.
 */
declare const simpleOperationRegex: RegExp;

/**
 * Function to convert simple operation to SQL condition.
 * @param operation - The simple operation string.
 * @returns The SQL condition string.
 */
declare function simpleOperationToSQL(operation: string): string;

/**
 * Recursively generates MySQL conditions based on the provided input.
 * @param type - The type of condition.
 * @param conditions - The conditions to process.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated MySQL conditions as a string.
 */
export declare function checkCondition({ type, conditions, subOperator }: { type: string, conditions: {}, subOperator: string }): string;
