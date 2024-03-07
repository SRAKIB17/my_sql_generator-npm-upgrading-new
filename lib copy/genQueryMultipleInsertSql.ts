/**
 * Generates a SQL INSERT query string for multiple records based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - An array of records containing data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 * @throws Throws an error if the insert data array is empty.
 */
function genQueryMultipleInsertSql({ table, insert_data, hasDate, date_field }: { table: string, insert_data: Array<Record<string, any>>, hasDate?: boolean, date_field?: string }): string {
    if (!insert_data || insert_data.length === 0) {
        throw new Error('Insert data array is empty');
    }

    const columns = Object.keys(insert_data[0]).join(',');
    const values = insert_data.map(row => `(${JSON.stringify(Object.values(row)).slice(1, -1)}${hasDate ? `,CURRENT_TIMESTAMP` : ''})`).join(',');

    const sql = `INSERT INTO ${table} (${columns}${hasDate ? `,${date_field}` : ''}) VALUES ${values}`;

    return sql;
}

export default genQueryMultipleInsertSql;
