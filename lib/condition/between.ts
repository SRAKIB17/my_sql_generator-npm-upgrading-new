/**
 * Defines the structure for the "between" condition in a SQL query.
 */
export type between = {
    [field_name: string]: {
        "$from": string | number,
        "$to": string | number,
    }
}

/**
 * Defines the structure for the between condition type, which includes "$between" and "$not_between".
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
 * Processes the "between" conditions recursively to generate SQL statements.
 * @param conditions The "between" conditions to be processed.
 * @param operatorKeyword The keyword for the SQL operator, if any.
 * @param subOperator The sub-operator for combining conditions.
 * @returns The processed SQL conditions.
 */
export function processBetweenConditions(
    conditions: between | { "$or"?: between, "$and"?: between },
    operatorKeyword: string,
    subOperator: string
) {
    const subConditions: string[] = [];
    for (const [key, value] of Object.entries(conditions)) {
        const subOperator = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && ["$or", "$and"]?.includes(key)) {
            const subCondition = processBetweenConditions(value, operatorKeyword, subOperator);
            subConditions.push(`(${subCondition})`);
        }
        else {
            const from = value?.$from;
            const to = value?.$to;
            let condition = `${operatorKeyword ? `${operatorKeyword} ` : ""}${key} BETWEEN ${JSON.stringify(from)} AND ${JSON.stringify(to)}`;
            subConditions.push(`(${condition})`);
        }
    }
    return subConditions.join(` ${subOperator} `);
}

/**
 * Generates SQL conditions for the "between" type.
 * @param condition The "between" conditions to be processed.
 * @param subOperator The sub-operator for combining conditions.
 * @returns The SQL conditions for the "between" type.
 */
export function betweenConditions(condition: betweenType, subOperator = 'AND') {
    let sqlConditions = "";
    let inputEntries = Object.entries(condition);
    inputEntries.forEach(([type, conditions], index) => {
        let operatorBetweenKeyword = type?.includes('not') ? 'NOT' : '';
        sqlConditions += `${sqlConditions ? " AND " : ""}${processBetweenConditions(conditions, operatorBetweenKeyword, subOperator)}`
    })
    return sqlConditions?.trim();
}
