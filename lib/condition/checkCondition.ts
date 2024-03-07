// Importing functions for processing BETWEEN, INCLUDE, and PATTERN conditions
import { Condition } from ".";
import { processBetweenConditions } from "./between";
import { processIncludeConditions } from "./include";
import { processPatternConditions } from "./pattern";

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
 * Recursively generates MySQL conditions based on the provided input.
 * @param type - The type of condition.
 * @param conditions - The conditions to process.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated MySQL conditions as a string.
 */
export function checkCondition({ type, conditions, subOperator }: { type: string, conditions: any, subOperator: string }) {
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
        const subOperator = type?.includes("or") ? "OR" : "AND";
        return `(${Condition(conditions, subOperator)})`;
    }
    else {
        let subCondition: string[] = [];
        if (Array.isArray(conditions)) {
            const fieldConditions: string = conditions?.map(condition => {
                const operator = Object?.keys(condition)?.[0];
                const value = condition[operator];
                return `(${type} ${operator} ${JSON.stringify(value)})`;
            })?.join(` ${subOperator} `);
            subCondition.push(fieldConditions)
        }
        else {
            const operator = Object.keys(conditions)[0];
            const value = conditions?.[operator];
            subCondition.push(`(${type} ${operator} ${JSON.stringify(value)})`);
        }
        return subCondition.join(` ${subOperator} `);
    }
}
