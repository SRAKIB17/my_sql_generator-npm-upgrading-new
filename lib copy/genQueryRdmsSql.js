"use strict";
/**
 * Generates a SQL SELECT query string for relational database management systems (RDMS) based on the provided parameters.
 *
 * @param table_list - An object containing table names.
 * @param relation_key - An object defining table relations.
 * @param specific_column - An object defining specific columns to select.
 * @param limitSkip - An object defining limit and skip for pagination.
 * @param condition - A string defining SQL conditions.
 * @param sort - An object defining sorting criteria.
 * @param havingCondition - A string defining HAVING clause conditions.
 * @param groupBY - An array defining columns for GROUP BY clause.
 * @param min - A string defining the column to calculate minimum value.
 * @param max - A string defining the column to calculate maximum value.
 * @param count - A string defining the column to count.
 * @param sum - A string defining the column to calculate sum.
 * @returns The generated SQL SELECT query string.
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var genQueryRdmsSql = function (_a) {
    var _b, _c, _d;
    var _e = _a.table_list, table_list = _e === void 0 ? {
        table1: "",
        table2: "",
        table3: '',
        table4: '',
        table5: '',
        table6: '',
        table7: '',
        table8: '',
    } : _e, _f = _a.relation_key, relation_key = _f === void 0 ? {
        "on": {
            "relation": "CROSS JOIN",
            "table1": "",
            "table2": "",
            "table3": "",
            "table4": "",
            "table5": "",
            "table6": "",
            "table7": ""
        },
        "on1": {
            "relation": "CROSS JOIN",
            "table1": "",
            "table2": "",
            "table3": "",
            "table4": "",
            "table5": "",
            "table6": "",
            "table7": ""
        },
        "on2": {
            "relation": "INNER JOIN",
            "table1": "",
            "table2": "",
            "table3": "",
            "table4": "",
            "table5": "",
            "table6": "",
            "table7": ""
        },
        "on3": {
            "relation": "LEFT JOIN",
            "table1": "",
            "table2": "",
            "table3": "",
            "table4": "",
            "table5": "",
            "table6": "",
            "table7": ""
        },
        "on4": {
            "relation": "CROSS JOIN",
            "table1": "",
            "table2": "",
            "table3": "",
            "table4": "",
            "table5": "",
            "table6": "",
            "table7": ""
        },
        "on5": {
            "relation": "CROSS JOIN",
            "table1": "",
            "table2": "",
            "table3": "",
            "table4": "",
            "table5": "",
            "table6": "",
            "table7": ""
        },
    } : _f, _g = _a.specific_column, specific_column = _g === void 0 ? {
        "table1": [],
        "table2": [],
        "table3": [],
        "table4": [],
        "table5": [],
        "table6": [],
        "table7": [],
    } : _g, _h = _a.limitSkip, limitSkip = _h === void 0 ? { limit: '', skip: '' } : _h, _j = _a.condition, condition = _j === void 0 ? '' : _j, sort = _a.sort, _k = _a.havingCondition, havingCondition = _k === void 0 ? '' : _k, _l = _a.groupBY, groupBY = _l === void 0 ? [] : _l, _m = _a.min, min = _m === void 0 ? '' : _m, _o = _a.max, max = _o === void 0 ? '' : _o, _p = _a.count, count = _p === void 0 ? '' : _p, _q = _a.sum, sum = _q === void 0 ? "" : _q;
    var table_length = (_b = Object.values(table_list)) === null || _b === void 0 ? void 0 : _b.length;
    var main_table_name = table_list === null || table_list === void 0 ? void 0 : table_list.table1;
    var get_specif_field;
    if (Object.values(specific_column).flat().length) {
        get_specif_field = Object.entries(specific_column).map(function (sf) {
            var _a;
            var table = sf === null || sf === void 0 ? void 0 : sf[0];
            var table_all_list = table_list;
            var column = (table_all_list === null || table_all_list === void 0 ? void 0 : table_all_list[table]) && ((_a = sf === null || sf === void 0 ? void 0 : sf[1]) === null || _a === void 0 ? void 0 : _a.map(function (clm) {
                return "".concat(table_all_list[table], ".").concat(clm);
            }));
            return column;
        }).flat().join(', ');
    }
    var aliasesRelationTable = [];
    var relationWithTable = (_d = (_c = Object.entries(relation_key).map(function (r_key) {
        var relationRdms = r_key[1];
        var relation = relationRdms.relation, onCondition = __rest(relationRdms, ["relation"]);
        var relationTable;
        var getCondition = Object.entries(onCondition).map(function (rdmsTable) {
            var aliasesTable = rdmsTable[0];
            var table_all_list = table_list;
            if (aliasesTable !== 'table1' && !(aliasesRelationTable === null || aliasesRelationTable === void 0 ? void 0 : aliasesRelationTable.includes(table_all_list[aliasesTable]))) {
                relationTable = table_all_list[aliasesTable];
                aliasesRelationTable = __spreadArray(__spreadArray([], aliasesRelationTable, true), [relationTable], false);
            }
            var column = rdmsTable[1];
            return "".concat(table_all_list[aliasesTable], ".").concat(column);
        }).join(' = ');
        return "".concat(relation, " ").concat(relationTable, " ON ").concat(getCondition);
    })) === null || _c === void 0 ? void 0 : _c.slice(0, table_length - 1)) === null || _d === void 0 ? void 0 : _d.join('\n');
    var limit = limitSkip === null || limitSkip === void 0 ? void 0 : limitSkip.limit;
    var skip = limitSkip === null || limitSkip === void 0 ? void 0 : limitSkip.skip;
    var limit_skip;
    if (limit) {
        limit_skip = " LIMIT ".concat(skip, ", ").concat(limit);
    }
    var sorting;
    var getSort = sort || {};
    if (Object.values(getSort).flat().length) {
        sorting = " ORDER BY ".concat(Object.entries(getSort).map(function (f) {
            var field_column = f[0];
            var asc = f[1];
            var table_all_list = table_list;
            return "".concat(table_all_list[field_column], ".").concat(asc[0], " ").concat((asc[1] == 1 ? "ASC" : "DESC"));
        }).toString());
    }
    var getGroupBy;
    if (groupBY === null || groupBY === void 0 ? void 0 : groupBY.length) {
        getGroupBy = " GROUP BY  ".concat(groupBY === null || groupBY === void 0 ? void 0 : groupBY.join(','));
    }
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
    var sql = "SELECT ".concat((get_specif_field ? get_specif_field : (mmcsColumn ? mmcsColumn : '*')), " FROM ").concat(main_table_name, " ").concat(relationWithTable, " ").concat(condition ? "WHERE " + condition : '');
    sql += "".concat(getGroupBy ? getGroupBy : "", " ").concat(havingCondition ? " HAVING " + havingCondition : '').concat(sorting ? sorting : '').concat(limit_skip ? limit_skip : "");
    return sql;
};
exports.default = genQueryRdmsSql;
