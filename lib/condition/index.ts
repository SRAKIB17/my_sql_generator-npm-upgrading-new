// Importing functions and types for processing conditions
import { between, betweenConditions, betweenType } from "./between";
import { checkCondition, simpleOperation } from "./checkCondition";
import { $include, includeConditions, includeType } from "./include";
import { patternConditions, patternType } from "./pattern";

/**
 * Combines all condition types into one.
 */
interface AllCombine extends simpleOperation, includeType, patternType, betweenType, simpleOperation {
}

/**
 * Defines the structure of a condition object.
 */
export interface condition extends simpleOperation, includeType, patternType, betweenType {
    "$and"?: AllCombine,
    "$or"?: AllCombine,
    [field_name: string]: unknown
}

/**
 * Generates SQL-like conditions based on the provided input.
 * @param condition - The condition object.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated conditions as a string.
 */
export function condition(condition: condition, subOperator = "AND") {
    let sqlConditions = "";
    let inputEntries = Object.entries(condition);
    inputEntries.forEach(([type, conditions], index) => {
        sqlConditions += `${sqlConditions ? " AND " : ""}${checkCondition({
            conditions: conditions,
            type: type,
            subOperator: subOperator
        })}`
    })
    return sqlConditions?.trim();
}

/**
 * Exports types and functions related to condition processing.
 */
export {
    $include, between, betweenConditions, betweenType,
    checkCondition, includeConditions, includeType, patternConditions, patternType, simpleOperation
};

