/**
 * Processes include conditions recursively.
 * @param conditions - The include condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated include conditions as a string.
 */
export function processIncludeConditions(conditions, operatorKeyword, subOperator) {
    const subConditions = [];
    for (const [key, value] of Object.entries(conditions)) {
        const subOperator = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && !Array.isArray(value)) {
            const subCondition = processIncludeConditions(value, operatorKeyword, subOperator);
            subConditions.push(`(${subCondition})`);
        }
        else {
            const conditionsList = [];
            if (Array.isArray(value)) {
                // const valuesStr = value.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
                const valuesStr = JSON.stringify(value)?.slice(1, -1);
                conditionsList.push(`${key} ${operatorKeyword} (${valuesStr})`);
            }
            else {
                conditionsList.push(`${key} ${operatorKeyword} (${JSON.stringify(value)?.slice(1, -1)})`);
            }
            subConditions.push(conditionsList.join(` ${subOperator} `));
        }
    }
    return subConditions.join(` ${subOperator} `);
}
/**
 * Generates SQL-like INCLUDE conditions based on the provided input.
 * @param condition - The includeType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated INCLUDE conditions as a string.
 */
export function IncludeConditions(condition, subOperator = 'AND') {
    let sqlConditions = "";
    let inputEntries = Object.entries(condition);
    inputEntries.forEach(([type, conditions], index) => {
        let includeOperatorKeyword = type?.includes('not') ? 'NOT IN' : 'IN';
        sqlConditions += `${sqlConditions ? " AND " : ""}${processIncludeConditions({
            conditions: conditions
        }, includeOperatorKeyword, subOperator)}`;
    });
    return sqlConditions?.trim();
}
