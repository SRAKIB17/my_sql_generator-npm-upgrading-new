/**
 * Generates a SQL INSERT query string for multiple records based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - An array of records containing data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 * @throws Throws an error if the insert data array is empty.
 */
export declare function genQueryMultipleInsertSql({ table, insert_data, hasDate, date_field }: { table: string, insert_data: Array<Record<string, any>>, hasDate?: boolean, date_field?: string }): string;

/**
 * Exports the genQueryMultipleInsertSql function as the default export.
 */
export default genQueryMultipleInsertSql;
