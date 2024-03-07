"use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.checkCondition = void 0;
// Importing functions for processing BETWEEN, INCLUDE, and PATTERN conditions
var _1 = require("."), between_1 = require("./between"), include_1 = require("./include"), pattern_1 = require("./pattern"), simpleOperation_1 = require("./simpleOperation");
/**
 * Recursively generates MySQL conditions based on the provided input.
 * @param type - The type of condition.
 * @param conditions - The conditions to process.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated MySQL conditions as a string.
 */
function checkCondition(e) { var n, i, o, t, r = e.type, c = e.conditions, d = e.subOperator; if (null === (n = ["$not_between", "$between"]) || void 0 === n ? void 0 : n.includes(r)) { var u = (null == r ? void 0 : r.includes("not")) ? "NOT" : ""; return "(".concat((0, between_1.processBetweenConditions)(c, u, d), ")") } if (null === (i = ["$include", "$not_include"]) || void 0 === i ? void 0 : i.includes(r)) { var l = (null == r ? void 0 : r.includes("not")) ? "NOT IN" : "IN"; return "(".concat((0, include_1.processIncludeConditions)(c, l, d), ")") } if (null === (o = ["$pattern", "$not_pattern"]) || void 0 === o ? void 0 : o.includes(r)) { var s = r.includes("not") ? "NOT" : ""; return "(".concat((0, pattern_1.processPatternConditions)(c, s, d), ")") } if (null === (t = ["$and", "$or"]) || void 0 === t ? void 0 : t.includes(r)) { var p = (null == r ? void 0 : r.includes("or")) ? "OR" : "AND"; return "(".concat((0, _1.conditions)(c, p), ")") } return (0, simpleOperation_1.processSimpleOperationConditions)({ conditions: c, subOperator: d, type: r }) } exports.checkCondition = checkCondition;