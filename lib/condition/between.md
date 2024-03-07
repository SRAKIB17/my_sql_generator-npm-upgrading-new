Below is the documentation for the provided TypeScript declarations for handling "between" conditions in SQL queries:

---

## `BetweenCondition` Type

Defines the structure for the "between" condition in a SQL query.

### Properties

- `[field_name: string]`: The name of the field in the database table.
- `"$from"`: The starting value for the range in the "between" condition.
- `"$to"`: The ending value for the range in the "between" condition.

## `BetweenConditions` Interface

Defines the structure for the between condition type, which includes "$between" and "$not_between".

### Properties

- `"$between"`: Represents the between condition, allowing for specifying ranges.
- `"$not_between"`: Represents the negation of the between condition, allowing for specifying ranges.

## `processBetweenConditions` Function

Processes the "between" conditions recursively to generate SQL statements.

### Parameters

- `conditions`: The "between" conditions to be processed.
- `operatorKeyword`: The keyword for the SQL operator, if any.
- `subOperator`: The sub-operator for combining conditions.

### Returns

- `string`: The processed SQL conditions.

## `betweenConditions` Function

Generates SQL conditions for the "between" type.

### Parameters

- `condition`: The "between" conditions to be processed.
- `subOperator`: *(optional)* The sub-operator for combining conditions.

### Returns

- `string`: The SQL conditions for the "between" type.

### Example

```ts
console.log(betweenConditions({
    "$between": {
        "$and": {
            test9: {
                "$from": 30,
                "$to": 50
            },
            test10: {
                "$from": 30,
                "$to": 50
            },
        },
        "$or": {
            test11: {
                "$from": 30,
                "$to": 50
            },
            test12: {
                "$from": 30,
                "$to": 50
            },
        }
    }
}))
```

---

This documentation provides an overview of the types, interfaces, and functions provided in the TypeScript declarations for handling "between" conditions in SQL queries. It includes explanations of the properties, parameters, and return types for each component, helping users understand how to use and interact with the provided code.
