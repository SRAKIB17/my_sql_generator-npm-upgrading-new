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

export interface simpleOperationType {
    [field_name: string]: simpleOp | simpleOp[] | unknown
}

/**
 * Processes simple operation conditions.
 * @param conditions The conditions to process.
 * @param subOperator The sub-operator to use.
 * @param type The type of condition.
 * @returns The processed SQL condition string.
 */
export function processSimpleOperationConditions({
    conditions,
    subOperator,
    type
}: {
    conditions: any,
    subOperator: string,
    type: string
}) {
    let subCondition: string[] = [];
    if (Array.isArray(conditions)) {
        const fieldConditions = conditions?.map(condition => {
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

interface simpleOperationConditionType extends simpleOperationType {
    "$and"?: simpleOperationType,
    "$or"?: simpleOperationType,
}

/**
 * Converts simple operation conditions to SQL format.
 * @param condition The condition to convert.
 * @param subOperator The sub-operator to use.
 * @returns The SQL condition string.
 */
export function simpleOperationConditions(condition: simpleOperationConditionType | unknown, subOperator = 'AND') {
    let sqlConditions = "";
    const getCondition: any = condition;
    let inputEntries = Object.entries(getCondition);
    inputEntries.forEach(([type, conditions], index) => {
        if (["$and", "$or"]?.includes(type)) {
            const subOperator = type?.includes("or") ? "OR" : "AND";
            sqlConditions += `(${simpleOperationConditions(conditions, subOperator)})`;
        }
        else {
            sqlConditions += `${sqlConditions ? ` ${subOperator} ` : ""}${processSimpleOperationConditions({
                conditions: conditions,
                subOperator: subOperator,
                type: type
            })
                }`
        }

    })
    return sqlConditions?.trim();
}
