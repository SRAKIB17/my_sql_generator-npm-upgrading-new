"use strict";
/**
 * Generates a SQL DELETE query string based on the provided table and condition.
 * @param table - The name of the table from which to delete records.
 * @param condition - The condition to apply to the DELETE operation (optional).
 * @returns The generated SQL DELETE query string.
 */
function genQueryDeleteSql(e) { var t = e.table, n = e.condition; return "DELETE FROM ".concat(t).concat(n ? " WHERE " + n + " " : "") } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = genQueryDeleteSql;