/**
 * Generates a SQL DELETE query string based on the provided table and condition.
 * @param table - The name of the table from which to delete records.
 * @param condition - The condition to apply to the DELETE operation (optional).
 * @returns The generated SQL DELETE query string.
 */
function genQueryDeleteSql({ table, condition }) {
    const s = `DELETE FROM ${table}${condition ? " WHERE " + condition + " " : ""}`;
    return s;
}
export default genQueryDeleteSql;
