"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleOperationConditions = exports.patternConditions = exports.includeConditions = exports.checkCondition = exports.betweenConditions = exports.conditions = void 0;
// Importing functions and types for processing conditions
var between_1 = require("./between");
Object.defineProperty(exports, "betweenConditions", { enumerable: true, get: function () { return between_1.betweenConditions; } });
var checkCondition_1 = require("./checkCondition");
Object.defineProperty(exports, "checkCondition", { enumerable: true, get: function () { return checkCondition_1.checkCondition; } });
var include_1 = require("./include");
Object.defineProperty(exports, "includeConditions", { enumerable: true, get: function () { return include_1.includeConditions; } });
var pattern_1 = require("./pattern");
Object.defineProperty(exports, "patternConditions", { enumerable: true, get: function () { return pattern_1.patternConditions; } });
var simpleOperation_1 = require("./simpleOperation");
Object.defineProperty(exports, "simpleOperationConditions", { enumerable: true, get: function () { return simpleOperation_1.simpleOperationConditions; } });
/**
 * Generates SQL-like conditions based on the provided input.
 * @param condition - The condition object.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated conditions as a string.
 */
function conditions(condition, subOperator) {
    if (subOperator === void 0) { subOperator = "AND"; }
    var sqlConditions = "";
    var inputEntries = Object.entries(condition);
    inputEntries.forEach(function (_a, index) {
        var type = _a[0], conditions = _a[1];
        sqlConditions += "".concat(sqlConditions ? " AND " : "").concat((0, checkCondition_1.checkCondition)({
            conditions: conditions,
            type: type,
            subOperator: subOperator
        }));
    });
    return sqlConditions === null || sqlConditions === void 0 ? void 0 : sqlConditions.trim();
}
exports.conditions = conditions;
