/**
 * Generates a SQL INSERT query string based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - The data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 */
function genQueryInsertSql({ table, insert_data, hasDate, date_field }) {
    const getColumns = [...Object.keys(insert_data)].join(',');
    const columnValues = JSON?.stringify([...Object.values(insert_data)])?.slice(1, -1);
    const sql = `INSERT INTO ${table} (${getColumns}${hasDate ? ("," + date_field) : ""}) VALUES (${columnValues}${hasDate ? ",CURRENT_TIMESTAMP" : ""})`;
    return sql;
}
export default genQueryInsertSql;
