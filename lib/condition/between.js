"use strict";
/**
 * Processes the "between" conditions recursively to generate SQL statements.
 * @param conditions The "between" conditions to be processed.
 * @param operatorKeyword The keyword for the SQL operator, if any.
 * @param subOperator The sub-operator for combining conditions.
 * @returns The processed SQL conditions.
 */
function processBetweenConditions(e, n, o) { for (var t, i = [], s = 0, c = Object.entries(e); s < c.length; s++) { var r = c[s], d = r[0], a = r[1], u = "$or" === d ? "OR" : "AND"; if ("object" == typeof a && (null === (t = ["$or", "$and"]) || void 0 === t ? void 0 : t.includes(d))) { var l = processBetweenConditions(a, n, u); i.push("(".concat(l, ")")) } else { var p = null == a ? void 0 : a.$from, v = null == a ? void 0 : a.$to, f = "".concat(n ? "".concat(n, " ") : "").concat(d, " BETWEEN ").concat(JSON.stringify(p), " AND ").concat(JSON.stringify(v)); i.push("(".concat(f, ")")) } } return i.join(" ".concat(o, " ")) }
/**
 * Generates SQL conditions for the "between" type.
 * @param condition The "between" conditions to be processed.
 * @param subOperator The sub-operator for combining conditions.
 * @returns The SQL conditions for the "between" type.
 */
function betweenConditions(e, n) { void 0 === n && (n = "AND"); var o = ""; return Object.entries(e).forEach((function (e, t) { var i = e[0], s = e[1], c = (null == i ? void 0 : i.includes("not")) ? "NOT" : ""; o += "".concat(o ? " AND " : "").concat(processBetweenConditions(s, c, n)) })), null == o ? void 0 : o.trim() } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.betweenConditions = exports.processBetweenConditions = void 0, exports.processBetweenConditions = processBetweenConditions, exports.betweenConditions = betweenConditions;