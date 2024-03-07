"use strict";
/**
 * Processes include conditions recursively.
 * @param conditions - The include condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated include conditions as a string.
 */
function processIncludeConditions(n, o, i) { for (var c, e, t = [], s = 0, r = Object.entries(n); s < r.length; s++) { var d = r[s], u = d[0], l = d[1], a = "$or" === u ? "OR" : "AND"; if ("object" != typeof l || Array.isArray(l)) { var p = []; if (Array.isArray(l)) { var v = null === (c = JSON.stringify(l)) || void 0 === c ? void 0 : c.slice(1, -1); p.push("".concat(u, " ").concat(o, " (").concat(v, ")")) } else p.push("".concat(u, " ").concat(o, " (").concat(null === (e = JSON.stringify(l)) || void 0 === e ? void 0 : e.slice(1, -1), ")")); t.push(p.join(" ".concat(a, " "))) } else { var f = processIncludeConditions(l, o, a); t.push("(".concat(f, ")")) } } return t.join(" ".concat(i, " ")) }
/**
 * Generates SQL-like INCLUDE conditions based on the provided input.
 * @param condition - The includeType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated INCLUDE conditions as a string.
 */
function includeConditions(n, o) { void 0 === o && (o = "AND"); var i = ""; return Object.entries(n).forEach((function (n, c) { var e = n[0], t = n[1], s = (null == e ? void 0 : e.includes("not")) ? "NOT IN" : "IN"; i += "".concat(i ? " AND " : "").concat(processIncludeConditions(t, s, o)) })), null == i ? void 0 : i.trim() } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.includeConditions = exports.processIncludeConditions = void 0, exports.processIncludeConditions = processIncludeConditions, exports.includeConditions = includeConditions;