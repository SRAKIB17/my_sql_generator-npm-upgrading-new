"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleOperationConditions = exports.processSimpleOperationConditions = void 0;
/**
 * Processes simple operation conditions.
 * @param conditions The conditions to process.
 * @param subOperator The sub-operator to use.
 * @param type The type of condition.
 * @returns The processed SQL condition string.
 */
function processSimpleOperationConditions(_a) {
    var _b;
    var conditions = _a.conditions, subOperator = _a.subOperator, type = _a.type;
    var subCondition = [];
    if (Array.isArray(conditions)) {
        var fieldConditions = (_b = conditions === null || conditions === void 0 ? void 0 : conditions.map(function (condition) {
            var _a;
            var operator = (_a = Object === null || Object === void 0 ? void 0 : Object.keys(condition)) === null || _a === void 0 ? void 0 : _a[0];
            var value = condition[operator];
            return "(".concat(type, " ").concat(operator, " ").concat(JSON.stringify(value), ")");
        })) === null || _b === void 0 ? void 0 : _b.join(" ".concat(subOperator, " "));
        subCondition.push(fieldConditions);
    }
    else {
        var operator = Object.keys(conditions)[0];
        var value = conditions === null || conditions === void 0 ? void 0 : conditions[operator];
        subCondition.push("(".concat(type, " ").concat(operator, " ").concat(JSON.stringify(value), ")"));
    }
    return subCondition.join(" ".concat(subOperator, " "));
}
exports.processSimpleOperationConditions = processSimpleOperationConditions;
/**
 * Converts simple operation conditions to SQL format.
 * @param condition The condition to convert.
 * @param subOperator The sub-operator to use.
 * @returns The SQL condition string.
 */
function simpleOperationConditions(condition, subOperator) {
    if (subOperator === void 0) { subOperator = 'AND'; }
    var sqlConditions = "";
    var getCondition = condition;
    var inputEntries = Object.entries(getCondition);
    inputEntries.forEach(function (_a, index) {
        var _b;
        var type = _a[0], conditions = _a[1];
        if ((_b = ["$and", "$or"]) === null || _b === void 0 ? void 0 : _b.includes(type)) {
            var subOperator_1 = (type === null || type === void 0 ? void 0 : type.includes("or")) ? "OR" : "AND";
            sqlConditions += "(".concat(simpleOperationConditions(conditions, subOperator_1), ")");
        }
        else {
            sqlConditions += "".concat(sqlConditions ? " ".concat(subOperator, " ") : "").concat(processSimpleOperationConditions({
                conditions: conditions,
                subOperator: subOperator,
                type: type
            }));
        }
    });
    return sqlConditions === null || sqlConditions === void 0 ? void 0 : sqlConditions.trim();
}
exports.simpleOperationConditions = simpleOperationConditions;
