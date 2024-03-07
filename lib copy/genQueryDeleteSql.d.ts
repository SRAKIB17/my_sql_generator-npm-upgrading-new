/**
 * Generates a SQL DELETE query string based on the provided table and condition.
 * @param table - The name of the table from which to delete records.
 * @param condition - The condition to apply to the DELETE operation (optional).
 * @returns The generated SQL DELETE query string.
 */
export declare function genQueryDeleteSql({ table, condition }: { table: string, condition: string }): string;

/**
 * Exports the genQueryDeleteSql function as the default export.
 */
export default genQueryDeleteSql;
