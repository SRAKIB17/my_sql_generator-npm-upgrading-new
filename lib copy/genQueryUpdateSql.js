"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a SQL UPDATE query string based on the provided parameters.
 *
 * @param table - The name of the table to update.
 * @param update_data - An object containing the data to update.
 * @param condition - The condition for updating the data.
 * @returns The generated SQL UPDATE query string.
 */
function genQueryUpdateSql(_a) {
    var _b, _c;
    var table = _a.table, _d = _a.update_data, update_data = _d === void 0 ? {} : _d, condition = _a.condition;
    var updateInfo = (_c = (_b = Object.entries(update_data)) === null || _b === void 0 ? void 0 : _b.map(function (info) {
        var _a;
        var column = info === null || info === void 0 ? void 0 : info[0];
        var isNumber = typeof (info === null || info === void 0 ? void 0 : info[1]) == 'number' || typeof (info === null || info === void 0 ? void 0 : info[1]) == 'boolean';
        var column_value = info === null || info === void 0 ? void 0 : info[1];
        var value = isNumber ? info === null || info === void 0 ? void 0 : info[1] : column_value === null || column_value === void 0 ? void 0 : column_value.trim();
        var check = isNumber ? false : ((value === null || value === void 0 ? void 0 : value.indexOf(column)) == 0 || (value === null || value === void 0 ? void 0 : value.lastIndexOf(column)) == ((value === null || value === void 0 ? void 0 : value.length) - (column === null || column === void 0 ? void 0 : column.length)));
        return (column + '=' + ((isNumber ? false : (((_a = value === null || value === void 0 ? void 0 : value.match(/[+|-|\/|*]/gi)) === null || _a === void 0 ? void 0 : _a.length) == 1 && check)) ? value === null || value === void 0 ? void 0 : value.toString() : JSON === null || JSON === void 0 ? void 0 : JSON.stringify(value)));
    })) === null || _c === void 0 ? void 0 : _c.join(',');
    var s = "UPDATE ".concat(table, " SET ").concat(updateInfo).concat(condition ? " WHERE " + condition + " " : "");
    return s;
}
exports.default = genQueryUpdateSql;
