function genQueryDeleteSql({ table, condition }: { table: string, condition: string }) {
    const s = `DELETE FROM ${table}${condition ? " WHERE " + condition + " " : ""}`;
    return s
}

export default genQueryDeleteSql;
