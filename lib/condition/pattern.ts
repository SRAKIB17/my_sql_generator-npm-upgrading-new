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
    }, operatorKeyword: string, subOperator: string): string {
    const subConditions: string[] = [];
    for (const [key, value] of Object.entries(conditions)) {
        const subOperator = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && ["$or", "$and"]?.includes(key)) {
            const subCondition = processPatternConditions(value, operatorKeyword, subOperator);
            subConditions.push(`(${subCondition})`);
        }
        else {
            let condition = `${key} ${operatorKeyword ? `${operatorKeyword} ` : ""}LIKE ${JSON.stringify(value)}`;
            subConditions.push(`(${condition})`);
        }
    }
    return subConditions.join(` ${subOperator} `);
}

/**
 * Generates SQL-like PATTERN conditions based on the provided input.
 * @param condition - The patternType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated PATTERN conditions as a string.
 */
export function patternConditions(condition: patternType, subOperator = 'AND'): string {
    let sqlConditions = "";
    let inputEntries = Object.entries(condition);
    inputEntries.forEach(([type, conditions], index) => {
        const operatorKeyword = type.includes('not') ? 'NOT' : '';
        sqlConditions += `${sqlConditions ? " AND " : ""}${processPatternConditions({
            conditions: conditions
        }, operatorKeyword, subOperator)}`
    })
    return sqlConditions?.trim();
}
