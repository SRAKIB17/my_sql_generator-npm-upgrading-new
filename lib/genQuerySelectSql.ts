/**
 * Generates a SQL SELECT query string based on the provided parameters.
 * 
 * @param table - The name of the table to select data from.
 * @param limitSkip - An object containing limit and skip values for pagination.
 * @param condition - Additional conditions for filtering the results.
 * @param sort - An object representing the sorting criteria.
 * @param havingCondition - Additional conditions for filtering results after grouping.
 * @param groupBY - An array specifying the columns for grouping.
 * @param specific_column - An array specifying specific columns to select.
 * @param min - Specifies the minimum value to be computed.
 * @param max - Specifies the maximum value to be computed.
 * @param count - Specifies the count value to be computed.
 * @param sum - Specifies the sum value to be computed.
 * @returns The generated SQL SELECT query string.
 */
function genQuerySelectSql({
    table,
    limitSkip,
    condition = '',
    sort = {},
    havingCondition = '',
    groupBY = [],
    specific_column = [],
    min = '',
    max = '',
    count = '',
    sum = ''
}: {
    table: string;
    limitSkip?: { limit?: string | number; skip?: string | number };
    condition?: string;
    sort?: any;
    havingCondition?: string;
    groupBY?: string[];
    specific_column?: string[];
    min?: string;
    max?: string;
    count?: string;
    sum?: string;
}): string {
    const table_name = table;

    let mmcsColumn;
    if (min) {
        mmcsColumn = ` min(${min}) as minimum `;
    } else if (max) {
        mmcsColumn = ` max(${max}) as maximum `;
    } else if (count) {
        mmcsColumn = ` count(${count}) as count `;
    } else if (sum) {
        mmcsColumn = ` sum(${sum}) as summation `;
    }

    let sql = `SELECT ${(specific_column?.length ? specific_column?.join(', ') : (mmcsColumn ? mmcsColumn : '*'))} FROM ${table_name} ${condition ? "WHERE " + condition : ''}`;

    const limit = limitSkip?.limit;
    const skip = limitSkip?.skip;
    let limit_skip;
    if (limit) {
        limit_skip = ` LIMIT ${skip}, ${limit}`;
    }

    let sorting;
    if (Object.entries(sort)?.length >= 1) {
        sorting = ` ORDER BY ${Object.entries(sort).map(f => {
            const field_column = f[0];
            const asc = f[1];
            return `${field_column} ${(asc == 1 ? "ASC" : "DESC")}`;
        }).toString()}`;
    }

    let getGroupBy;
    if (groupBY?.length) {
        getGroupBy = ` GROUP BY  ${groupBY?.join(',')}`;
    }

    sql += `${getGroupBy ? getGroupBy : ""} ${havingCondition ? " HAVING " + havingCondition : ''}${sorting ? sorting : ''}${limit_skip ? limit_skip : ""}`;

    return sql;
}

export default genQuerySelectSql;
