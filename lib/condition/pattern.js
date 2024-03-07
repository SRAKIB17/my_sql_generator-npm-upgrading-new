"use strict";
/**
 * Processes pattern conditions recursively.
 * @param conditions - The pattern condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated pattern conditions as a string.
 */
function processPatternConditions(t, n, o) { for (var e, r = [], i = 0, s = Object.entries(t); i < s.length; i++) { var c = s[i], a = c[0], d = c[1], p = "$or" === a ? "OR" : "AND"; if ("object" == typeof d && (null === (e = ["$or", "$and"]) || void 0 === e ? void 0 : e.includes(a))) { var u = processPatternConditions(d, n, p); r.push("(".concat(u, ")")) } else { var v = "".concat(a, " ").concat(n ? "".concat(n, " ") : "", "LIKE ").concat(JSON.stringify(d)); r.push("(".concat(v, ")")) } } return r.join(" ".concat(o, " ")) }
/**
 * Generates SQL-like PATTERN conditions based on the provided input.
 * @param condition - The patternType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated PATTERN conditions as a string.
 */
function patternConditions(t, n) { void 0 === n && (n = "AND"); var o = ""; return Object.entries(t).forEach((function (t, e) { var r = t[0], i = t[1], s = r.includes("not") ? "NOT" : ""; o += "".concat(o ? " ".concat(n, " ") : "").concat(processPatternConditions(i, s, n)) })), null == o ? void 0 : o.trim() } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.patternConditions = exports.processPatternConditions = void 0, exports.processPatternConditions = processPatternConditions, exports.patternConditions = patternConditions;