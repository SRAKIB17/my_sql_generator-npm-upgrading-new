"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeConditions = exports.processIncludeConditions = void 0;
/**
 * Processes include conditions recursively.
 * @param conditions - The include condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated include conditions as a string.
 */
function processIncludeConditions(conditions, operatorKeyword, subOperator) {
    var _a, _b;
    var subConditions = [];
    for (var _i = 0, _c = Object.entries(conditions); _i < _c.length; _i++) {
        var _d = _c[_i], key = _d[0], value = _d[1];
        var subOperator_1 = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && !Array.isArray(value)) {
            var subCondition = processIncludeConditions(value, operatorKeyword, subOperator_1);
            subConditions.push("(".concat(subCondition, ")"));
        }
        else {
            var conditionsList = [];
            if (Array.isArray(value)) {
                var valuesStr = (_a = JSON.stringify(value)) === null || _a === void 0 ? void 0 : _a.slice(1, -1);
                conditionsList.push("".concat(key, " ").concat(operatorKeyword, " (").concat(valuesStr, ")"));
            }
            else {
                conditionsList.push("".concat(key, " ").concat(operatorKeyword, " (").concat((_b = JSON.stringify(value)) === null || _b === void 0 ? void 0 : _b.slice(1, -1), ")"));
            }
            subConditions.push(conditionsList.join(" ".concat(subOperator_1, " ")));
        }
    }
    return subConditions.join(" ".concat(subOperator, " "));
}
exports.processIncludeConditions = processIncludeConditions;
/**
 * Generates SQL-like INCLUDE conditions based on the provided input.
 * @param condition - The includeType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated INCLUDE conditions as a string.
 */
function includeConditions(condition, subOperator) {
    if (subOperator === void 0) { subOperator = 'AND'; }
    var sqlConditions = "";
    var inputEntries = Object.entries(condition);
    inputEntries.forEach(function (_a, index) {
        var type = _a[0], conditions = _a[1];
        var includeOperatorKeyword = (type === null || type === void 0 ? void 0 : type.includes('not')) ? 'NOT IN' : 'IN';
        sqlConditions += "".concat(sqlConditions ? " AND " : "").concat(processIncludeConditions(conditions, includeOperatorKeyword, subOperator));
    });
    return sqlConditions === null || sqlConditions === void 0 ? void 0 : sqlConditions.trim();
}
exports.includeConditions = includeConditions;
