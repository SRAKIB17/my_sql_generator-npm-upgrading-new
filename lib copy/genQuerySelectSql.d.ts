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
declare function genQuerySelectSql({
    table,
    limitSkip,
    condition,
    sort,
    havingCondition,
    groupBY,
    specific_column,
    min,
    max,
    count,
    sum
}: {
    /**
     * The name of the table to select data from.
     */
    table: string;
    /**
     * An object containing limit and skip values for pagination.
     */
    limitSkip?: {
        limit?: string | number;
        skip?: string | number;
    };
    /**
     * Additional conditions for filtering the results.
     */
    condition?: string;
    /**
     * An object representing the sorting criteria.
     */
    sort?: {
        [key: string]: number;
    };
    /**
     * Additional conditions for filtering results after grouping.
     */
    havingCondition?: string;
    /**
     * An array specifying the columns for grouping.
     */
    groupBY?: string[];
    /**
     * An array specifying specific columns to select.
     */
    specific_column?: string[];
    /**
     * Specifies the minimum value to be computed.
     */
    min?: string;
    /**
     * Specifies the maximum value to be computed.
     */
    max?: string;
    /**
     * Specifies the count value to be computed.
     */
    count?: string;
    /**
     * Specifies the sum value to be computed.
     */
    sum?: string;
}): string;

/**
 * Exports the genQuerySelectSql function as the default export.
 */
export default genQuerySelectSql;
