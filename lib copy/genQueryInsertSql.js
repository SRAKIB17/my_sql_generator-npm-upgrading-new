"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a SQL INSERT query string based on the provided table, insert data, and optional date field.
 * @param table - The name of the table to insert data into.
 * @param insert_data - The data to insert into the table.
 * @param hasDate - Indicates whether to include the current timestamp for a date field (optional, default: false).
 * @param date_field - The name of the date field (optional).
 * @returns The generated SQL INSERT query string.
 */
function genQueryInsertSql(_a) {
    var _b;
    var table = _a.table, insert_data = _a.insert_data, hasDate = _a.hasDate, date_field = _a.date_field;
    var getColumns = __spreadArray([], Object.keys(insert_data), true).join(',');
    var columnValues = (_b = JSON === null || JSON === void 0 ? void 0 : JSON.stringify(__spreadArray([], Object.values(insert_data), true))) === null || _b === void 0 ? void 0 : _b.slice(1, -1);
    var sql = "INSERT INTO ".concat(table, " (").concat(getColumns).concat(hasDate ? ("," + date_field) : "", ") VALUES (").concat(columnValues).concat(hasDate ? ",CURRENT_TIMESTAMP" : "", ")");
    return sql;
}
exports.default = genQueryInsertSql;
