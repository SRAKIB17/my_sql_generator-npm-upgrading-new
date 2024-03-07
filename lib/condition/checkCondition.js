// Importing functions for processing BETWEEN, INCLUDE, and PATTERN conditions
import { processBetweenConditions } from "./between";
import { processIncludeConditions } from "./include";
import { processPatternConditions } from "./pattern";
/**
 * Regular expression for identifying simple operations.
 */
const simpleOperationRegex = /"(=|>|<|>=|<=|!=)":\s*\{("[^"]+":\s*(?:"[^"]+"|\d+)),?\s*\}/g;
/**
 * Function to convert simple operation to SQL condition.
 * @param operation - The simple operation string.
 * @returns The SQL condition string.
 */
function simpleOperationToSQL(operation) {
    const match = operation?.match(/"(=|>|<|>=|<=|!=)":\s*\{(".*?"):\s*(.*?)\}/);
    const operator = match[1];
    const field = JSON.parse(match[2]);
    const value = JSON.stringify(match[3]);
    return `${field} ${operator} ${value}`;
}
/**
 * Recursively generates MySQL conditions based on the provided input.
 * @param type - The type of condition.
 * @param conditions - The conditions to process.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated MySQL conditions as a string.
 */
export function checkCondition({ type, conditions, subOperator }) {
    if (["$not_between", "$between"]?.includes(type)) {
        let operatorBetweenKeyword = type?.includes('not') ? 'NOT' : '';
        return `(${processBetweenConditions(conditions, operatorBetweenKeyword, subOperator)})`;
    }
    else if (["$include", "$not_include"]?.includes(type)) {
        let includeOperatorKeyword = type?.includes('not') ? 'NOT IN' : 'IN';
        return `(${processIncludeConditions(conditions, includeOperatorKeyword, subOperator)})`;
    }
    else if (["$pattern", "$not_pattern"]?.includes(type)) {
        const operatorKeyword = type.includes('not') ? 'NOT' : '';
        return `(${processPatternConditions(conditions, operatorKeyword, subOperator)})`;
    }
    else if (["$and", "$or"]?.includes(type)) {
        return `(${checkCondition({ type: "", conditions: conditions, subOperator: type?.includes("or") ? "OR" : "AND" })})`;
    }
    else {
        const simpleOperations = JSON.stringify(conditions).match(simpleOperationRegex);
        let subCondition = [];
        if (simpleOperations) {
            simpleOperations.forEach(operation => {
                subCondition.push(`(${simpleOperationToSQL(operation)})`);
            });
        }
        return subCondition.join(` ${subOperator} `);
    }
}
