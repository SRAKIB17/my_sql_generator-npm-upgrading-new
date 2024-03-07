"use strict"; var __spreadArray = this && this.__spreadArray || function (e, r, t) { if (t || 2 === arguments.length) for (var a, n = 0, c = r.length; n < c; n++)!a && n in r || (a || (a = Array.prototype.slice.call(r, 0, n)), a[n] = r[n]); return e.concat(a || Array.prototype.slice.call(r)) };
/**
 * Generates a SQL INSERT query string based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - The data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 */
function genQueryInsertSql(e) { var r, t = e.table, a = e.insert_data, n = e.hasDate, c = e.date_field, o = __spreadArray([], Object.keys(a), !0).join(","), l = null === (r = null === JSON || void 0 === JSON ? void 0 : JSON.stringify(__spreadArray([], Object.values(a), !0))) || void 0 === r ? void 0 : r.slice(1, -1); return "INSERT INTO ".concat(t, " (").concat(o).concat(n ? "," + c : "", ") VALUES (").concat(l).concat(n ? ",CURRENT_TIMESTAMP" : "", ")") } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = genQueryInsertSql;