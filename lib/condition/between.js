"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betweenConditions = exports.processBetweenConditions = void 0;
/**
 * Processes pattern conditions recursively.
 * @param conditions - The between or pattern condition object.
 * @param operatorKeyword - The keyword to be used before the condition.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated pattern conditions as a string.
 */
function processBetweenConditions(conditions, operatorKeyword, subOperator) {
    var _a;
    var subConditions = [];
    for (var _i = 0, _b = Object.entries(conditions); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        var subOperator_1 = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && ((_a = ["$or", "$and"]) === null || _a === void 0 ? void 0 : _a.includes(key))) {
            var subCondition = processBetweenConditions(value, operatorKeyword, subOperator_1);
            subConditions.push("(".concat(subCondition, ")"));
        }
        else {
            var from = value === null || value === void 0 ? void 0 : value.$from;
            var to = value === null || value === void 0 ? void 0 : value.$to;
            var condition = "".concat(operatorKeyword ? "".concat(operatorKeyword, " ") : "").concat(key, " BETWEEN ").concat(JSON.stringify(from), " AND ").concat(JSON.stringify(to));
            subConditions.push("(".concat(condition, ")"));
        }
    }
    return subConditions.join(" ".concat(subOperator, " "));
}
exports.processBetweenConditions = processBetweenConditions;
/**
 * Generates SQL-like BETWEEN conditions based on the provided input.
 * @param condition - The betweenType object containing conditions.
 * @param subOperator - The sub-operator to be used between multiple conditions.
 * @returns The generated BETWEEN conditions as a string.
 */
function betweenConditions(condition, subOperator) {
    if (subOperator === void 0) { subOperator = 'AND'; }
    var sqlConditions = "";
    var inputEntries = Object.entries(condition);
    inputEntries.forEach(function (_a, index) {
        var type = _a[0], conditions = _a[1];
        var operatorBetweenKeyword = (type === null || type === void 0 ? void 0 : type.includes('not')) ? 'NOT' : '';
        sqlConditions += "".concat(sqlConditions ? " AND " : "").concat(processBetweenConditions(conditions, operatorBetweenKeyword, subOperator));
    });
    return sqlConditions === null || sqlConditions === void 0 ? void 0 : sqlConditions.trim();
}
exports.betweenConditions = betweenConditions;
