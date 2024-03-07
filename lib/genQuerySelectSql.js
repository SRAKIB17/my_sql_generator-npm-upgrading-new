"use strict";
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
function genQuerySelectSql(n) { var o, c, t = n.table, i = n.limitSkip, a = n.condition, e = void 0 === a ? "" : a, l = n.sort, u = void 0 === l ? {} : l, d = n.havingCondition, v = void 0 === d ? "" : d, r = n.groupBY, m = void 0 === r ? [] : r, s = n.specific_column, S = void 0 === s ? [] : s, g = n.min, p = void 0 === g ? "" : g, E = n.max, O = void 0 === E ? "" : E, f = n.count, j = void 0 === f ? "" : f, x = n.sum, R = void 0 === x ? "" : x, b = t; p ? c = " min(".concat(p, ") as minimum ") : O ? c = " max(".concat(O, ") as maximum ") : j ? c = " count(".concat(j, ") as count ") : R && (c = " sum(".concat(R, ") as summation ")); var h, C, y, B = "SELECT ".concat((null == S ? void 0 : S.length) ? null == S ? void 0 : S.join(", ") : c || "*", " FROM ").concat(b, " ").concat(e ? "WHERE " + e : ""), I = null == i ? void 0 : i.limit, M = null == i ? void 0 : i.skip; return I && (h = " LIMIT ".concat(M, ", ").concat(I)), (null === (o = Object.entries(u)) || void 0 === o ? void 0 : o.length) >= 1 && (C = " ORDER BY ".concat(Object.entries(u).map((function (n) { var o = n[0], c = n[1]; return "".concat(o, " ").concat(1 == c ? "ASC" : "DESC") })).toString())), (null == m ? void 0 : m.length) && (y = " GROUP BY  ".concat(null == m ? void 0 : m.join(","))), B += "".concat(y || "", " ").concat(v ? " HAVING " + v : "").concat(C || "").concat(h || "") } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = genQuerySelectSql;