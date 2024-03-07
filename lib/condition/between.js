/**
 * Processes pattern conditions recursively.
 * @param conditions - The between or pattern condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated pattern conditions as a string.
 */
export function processBetweenConditions(conditions, operatorKeyword, subOperator) {
    const subConditions = [];
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
 * Generates SQL-like BETWEEN conditions based on the provided input.
 * @param condition - The betweenType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated BETWEEN conditions as a string.
 */
export function BetweenConditions(condition, subOperator = 'AND') {
    let sqlConditions = "";
    let inputEntries = Object.entries(condition);
    inputEntries.forEach(([type, conditions], index) => {
        let operatorBetweenKeyword = type?.includes('not') ? 'NOT' : '';
        sqlConditions += `${sqlConditions ? " AND " : ""}${processBetweenConditions({
            conditions: conditions
        }, operatorBetweenKeyword, subOperator)}`;
    });
    return sqlConditions?.trim();
}
