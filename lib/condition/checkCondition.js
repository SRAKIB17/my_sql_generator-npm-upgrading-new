"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCondition = void 0;
// Importing functions for processing BETWEEN, INCLUDE, and PATTERN conditions
var _1 = require(".");
var between_1 = require("./between");
var include_1 = require("./include");
var pattern_1 = require("./pattern");
var simpleOperation_1 = require("./simpleOperation");
/**
 * Recursively generates MySQL conditions based on the provided input.
 * @param type - The type of condition.
 * @param conditions - The conditions to process.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated MySQL conditions as a string.
 */
function checkCondition(_a) {
    var _b, _c, _d, _e;
    var type = _a.type, conditions = _a.conditions, subOperator = _a.subOperator;
    if ((_b = ["$not_between", "$between"]) === null || _b === void 0 ? void 0 : _b.includes(type)) {
        var operatorBetweenKeyword = (type === null || type === void 0 ? void 0 : type.includes('not')) ? 'NOT' : '';
        return "(".concat((0, between_1.processBetweenConditions)(conditions, operatorBetweenKeyword, subOperator), ")");
    }
    else if ((_c = ["$include", "$not_include"]) === null || _c === void 0 ? void 0 : _c.includes(type)) {
        var includeOperatorKeyword = (type === null || type === void 0 ? void 0 : type.includes('not')) ? 'NOT IN' : 'IN';
        return "(".concat((0, include_1.processIncludeConditions)(conditions, includeOperatorKeyword, subOperator), ")");
    }
    else if ((_d = ["$pattern", "$not_pattern"]) === null || _d === void 0 ? void 0 : _d.includes(type)) {
        var operatorKeyword = type.includes('not') ? 'NOT' : '';
        return "(".concat((0, pattern_1.processPatternConditions)(conditions, operatorKeyword, subOperator), ")");
    }
    else if ((_e = ["$and", "$or"]) === null || _e === void 0 ? void 0 : _e.includes(type)) {
        var subOperator_1 = (type === null || type === void 0 ? void 0 : type.includes("or")) ? "OR" : "AND";
        return "(".concat((0, _1.conditions)(conditions, subOperator_1), ")");
    }
    else {
        return (0, simpleOperation_1.processSimpleOperationConditions)({
            conditions: conditions,
            subOperator: subOperator,
            type: type
        });
    }
}
exports.checkCondition = checkCondition;
