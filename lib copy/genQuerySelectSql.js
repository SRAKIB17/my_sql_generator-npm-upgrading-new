"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a SQL SELECT query string based on the provided parameters.
 *
 * @param table - The name of the table to select data from.
 * @param limitSkip - An object containing limit and skip values for pagination.
 * @param condition - Additional conditions for filtering the results.
 * @param sort - An object representing the sorting criteria.
 * @param havingCondition - Additional conditions for filtering results after grouping.
 * @param groupBY - An array specifying the columns for grouping.
 * @param specific_column - An array specifying specific columns to select.
 * @param min - Specifies the minimum value to be computed.
 * @param max - Specifies the maximum value to be computed.
 * @param count - Specifies the count value to be computed.
 * @param sum - Specifies the sum value to be computed.
 * @returns The generated SQL SELECT query string.
 */
function genQuerySelectSql(_a) {
    var _b;
    var table = _a.table, limitSkip = _a.limitSkip, _c = _a.condition, condition = _c === void 0 ? '' : _c, _d = _a.sort, sort = _d === void 0 ? {} : _d, _e = _a.havingCondition, havingCondition = _e === void 0 ? '' : _e, _f = _a.groupBY, groupBY = _f === void 0 ? [] : _f, _g = _a.specific_column, specific_column = _g === void 0 ? [] : _g, _h = _a.min, min = _h === void 0 ? '' : _h, _j = _a.max, max = _j === void 0 ? '' : _j, _k = _a.count, count = _k === void 0 ? '' : _k, _l = _a.sum, sum = _l === void 0 ? '' : _l;
    var table_name = table;
    var mmcsColumn;
    if (min) {
        mmcsColumn = " min(".concat(min, ") as minimum ");
    }
    else if (max) {
        mmcsColumn = " max(".concat(max, ") as maximum ");
    }
    else if (count) {
        mmcsColumn = " count(".concat(count, ") as count ");
    }
    else if (sum) {
        mmcsColumn = " sum(".concat(sum, ") as summation ");
    }
    var sql = "SELECT ".concat(((specific_column === null || specific_column === void 0 ? void 0 : specific_column.length) ? specific_column === null || specific_column === void 0 ? void 0 : specific_column.join(', ') : (mmcsColumn ? mmcsColumn : '*')), " FROM ").concat(table_name, " ").concat(condition ? "WHERE " + condition : '');
    var limit = limitSkip === null || limitSkip === void 0 ? void 0 : limitSkip.limit;
    var skip = limitSkip === null || limitSkip === void 0 ? void 0 : limitSkip.skip;
    var limit_skip;
    if (limit) {
        limit_skip = " LIMIT ".concat(skip, ", ").concat(limit);
    }
    var sorting;
    if (((_b = Object.entries(sort)) === null || _b === void 0 ? void 0 : _b.length) >= 1) {
        sorting = " ORDER BY ".concat(Object.entries(sort).map(function (f) {
            var field_column = f[0];
            var asc = f[1];
            return "".concat(field_column, " ").concat((asc == 1 ? "ASC" : "DESC"));
        }).toString());
    }
    var getGroupBy;
    if (groupBY === null || groupBY === void 0 ? void 0 : groupBY.length) {
        getGroupBy = " GROUP BY  ".concat(groupBY === null || groupBY === void 0 ? void 0 : groupBY.join(','));
    }
    sql += "".concat(getGroupBy ? getGroupBy : "", " ").concat(havingCondition ? " HAVING " + havingCondition : '').concat(sorting ? sorting : '').concat(limit_skip ? limit_skip : "");
    return sql;
}
exports.default = genQuerySelectSql;
