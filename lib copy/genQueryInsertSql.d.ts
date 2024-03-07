/**
 * Generates a SQL INSERT query string based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - The data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 */
export declare function genQueryInsertSql({ table, insert_data, hasDate, date_field }: { table: string, insert_data: {} | any, hasDate?: boolean, date_field?: string }): string;

/**
 * Exports the genQueryInsertSql function as the default export.
 */
export default genQueryInsertSql;
