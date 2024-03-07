"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternConditions = exports.processPatternConditions = void 0;
/**
 * Processes pattern conditions recursively.
 * @param conditions - The pattern condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated pattern conditions as a string.
 */
function processPatternConditions(conditions, operatorKeyword, subOperator) {
    var _a;
    var subConditions = [];
    for (var _i = 0, _b = Object.entries(conditions); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        var subOperator_1 = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && ((_a = ["$or", "$and"]) === null || _a === void 0 ? void 0 : _a.includes(key))) {
            var subCondition = processPatternConditions(value, operatorKeyword, subOperator_1);
            subConditions.push("(".concat(subCondition, ")"));
        }
        else {
            var condition = "".concat(key, " ").concat(operatorKeyword ? "".concat(operatorKeyword, " ") : "", "LIKE ").concat(JSON.stringify(value));
            subConditions.push("(".concat(condition, ")"));
        }
    }
    return subConditions.join(" ".concat(subOperator, " "));
}
exports.processPatternConditions = processPatternConditions;
/**
 * Generates SQL-like PATTERN conditions based on the provided input.
 * @param condition - The patternType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated PATTERN conditions as a string.
 */
function patternConditions(condition, subOperator) {
    if (subOperator === void 0) { subOperator = 'AND'; }
    var sqlConditions = "";
    var inputEntries = Object.entries(condition);
    inputEntries.forEach(function (_a, index) {
        var type = _a[0], conditions = _a[1];
        var operatorKeyword = type.includes('not') ? 'NOT' : '';
        sqlConditions += "".concat(sqlConditions ? " ".concat(subOperator, " ") : "").concat(processPatternConditions(conditions, operatorKeyword, subOperator));
    });
    return sqlConditions === null || sqlConditions === void 0 ? void 0 : sqlConditions.trim();
}
exports.patternConditions = patternConditions;
