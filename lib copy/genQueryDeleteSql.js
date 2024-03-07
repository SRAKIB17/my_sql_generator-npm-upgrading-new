"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a SQL DELETE query string based on the provided table and condition.
 * @param table - The name of the table from which to delete records.
 * @param condition - The condition to apply to the DELETE operation (optional).
 * @returns The generated SQL DELETE query string.
 */
function genQueryDeleteSql(_a) {
    var table = _a.table, condition = _a.condition;
    var s = "DELETE FROM ".concat(table).concat(condition ? " WHERE " + condition + " " : "");
    return s;
}
exports.default = genQueryDeleteSql;
