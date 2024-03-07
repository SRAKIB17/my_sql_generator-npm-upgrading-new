/**
 * Generates a SQL UPDATE query string based on the provided parameters.
 * 
 * @param table - The name of the table to update.
 * @param update_data - An object containing the data to update.
 * @param condition - The condition for updating the data.
 * @returns The generated SQL UPDATE query string.
 */
declare function genQueryUpdateSql({
    table,
    update_data,
    condition
}: {
    table: string;
    update_data: Record<string, any>;
    condition: string;
}): string;

export default genQueryUpdateSql;
