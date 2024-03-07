"use strict";
/**
 * Generates a SQL INSERT query string for multiple records based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - An array of records containing data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 * @throws Throws an error if the insert data array is empty.
 */
function genQueryMultipleInsertSql(e) { var t = e.table, n = e.insert_data, r = e.hasDate, a = e.date_field; if (!n || 0 === n.length) throw new Error("Insert data array is empty"); var c = Object.keys(n[0]).join(","), o = n.map((function (e) { return "(".concat(JSON.stringify(Object.values(e)).slice(1, -1)).concat(r ? ",CURRENT_TIMESTAMP" : "", ")") })).join(","); return "INSERT INTO ".concat(t, " (").concat(c).concat(r ? ",".concat(a) : "", ") VALUES ").concat(o) } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = genQueryMultipleInsertSql;