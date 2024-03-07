// Importing functions and types for processing conditions
import { BetweenConditions } from "./between";
import { checkCondition } from "./checkCondition";
import { IncludeConditions } from "./include";
import { PatternConditions } from "./pattern";
/**
 * Generates SQL-like conditions based on the provided input.
 * @param condition - The condition object.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated conditions as a string.
 */
export function Condition(condition, subOperator = "AND") {
    let sqlConditions = "";
    let inputEntries = Object.entries(condition);
    inputEntries.forEach(([type, conditions], index) => {
        sqlConditions += `${sqlConditions ? " AND " : ""}${checkCondition({
            conditions: conditions,
            type: type,
            subOperator: subOperator
        })}`;
    });
    return sqlConditions?.trim();
}
/**
 * Exports types and functions related to condition processing.
 */
export { BetweenConditions, IncludeConditions, PatternConditions, checkCondition };
