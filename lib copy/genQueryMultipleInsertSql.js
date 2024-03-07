"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a SQL INSERT query string for multiple records based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - An array of records containing data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 * @throws Throws an error if the insert data array is empty.
 */
function genQueryMultipleInsertSql(_a) {
    var table = _a.table, insert_data = _a.insert_data, hasDate = _a.hasDate, date_field = _a.date_field;
    if (!insert_data || insert_data.length === 0) {
        throw new Error('Insert data array is empty');
    }
    var columns = Object.keys(insert_data[0]).join(',');
    var values = insert_data.map(function (row) { return "(".concat(JSON.stringify(Object.values(row)).slice(1, -1)).concat(hasDate ? ",CURRENT_TIMESTAMP" : '', ")"); }).join(',');
    var sql = "INSERT INTO ".concat(table, " (").concat(columns).concat(hasDate ? ",".concat(date_field) : '', ") VALUES ").concat(values);
    return sql;
}
exports.default = genQueryMultipleInsertSql;
