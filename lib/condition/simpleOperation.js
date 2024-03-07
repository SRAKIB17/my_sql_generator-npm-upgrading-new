"use strict";
/**
 * Processes simple operation conditions.
 * @param conditions The conditions to process.
 * @param subOperator The sub-operator to use.
 * @param type The type of condition.
 * @returns The processed SQL condition string.
 */
function processSimpleOperationConditions(o) { var i, n = o.conditions, t = o.subOperator, e = o.type, r = []; if (Array.isArray(n)) { var s = null === (i = null == n ? void 0 : n.map((function (o) { var i, n = null === (i = null == Object ? void 0 : Object.keys(o)) || void 0 === i ? void 0 : i[0], t = o[n]; return "(".concat(e, " ").concat(n, " ").concat(JSON.stringify(t), ")") }))) || void 0 === i ? void 0 : i.join(" ".concat(t, " ")); r.push(s) } else { var c = Object.keys(n)[0], p = null == n ? void 0 : n[c]; r.push("(".concat(e, " ").concat(c, " ").concat(JSON.stringify(p), ")")) } return r.join(" ".concat(t, " ")) }
/**
 * Converts simple operation conditions to SQL format.
 * @param condition The condition to convert.
 * @param subOperator The sub-operator to use.
 * @returns The SQL condition string.
 */
function simpleOperationConditions(o, i) { void 0 === i && (i = "AND"); var n = "", t = o; return Object.entries(t).forEach((function (o, t) { var e, r = o[0], s = o[1]; if (null === (e = ["$and", "$or"]) || void 0 === e ? void 0 : e.includes(r)) { var c = (null == r ? void 0 : r.includes("or")) ? "OR" : "AND"; n += "(".concat(simpleOperationConditions(s, c), ")") } else n += "".concat(n ? " ".concat(i, " ") : "").concat(processSimpleOperationConditions({ conditions: s, subOperator: i, type: r })) })), null == n ? void 0 : n.trim() } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.simpleOperationConditions = exports.processSimpleOperationConditions = void 0, exports.processSimpleOperationConditions = processSimpleOperationConditions, exports.simpleOperationConditions = simpleOperationConditions;