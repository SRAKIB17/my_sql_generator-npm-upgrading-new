function genQueryMultipleInsertSql({ table, insert_data, hasDate = false, date_field }: { table: string, insert_data: Array<Record<string, any>>, hasDate?: boolean, date_field?: string }): string {
    if (!insert_data || insert_data.length === 0) {
        throw new Error('Insert data array is empty');
    }

    const columns = Object.keys(insert_data[0]).join(',');
    const values = insert_data.map(row => `(${JSON.stringify(Object.values(row)).slice(1, -1)}${hasDate ? `,CURRENT_TIMESTAMP` : ''})`).join(',');

    const sql = `INSERT INTO ${table} (${columns}${hasDate ? `,${date_field}` : ''}) VALUES ${values}`;

    return sql;
}
export default genQueryMultipleInsertSql;
