Here's the documentation for the provided TypeScript declarations:

---

# Pattern Conditions

## Overview

The `patternConditions` module provides functions for processing and generating SQL-like pattern conditions. These conditions allow for pattern matching within SQL queries, including support for logical operators like `$or` and `$and`.

## Interface

### `patternType`

Defines the structure of pattern conditions, including both positive (`$pattern`) and negative (`$not_pattern`) patterns.

- **`$pattern`**: Specifies the positive pattern conditions.
- **`$not_pattern`**: Specifies the negative pattern conditions.

## Functions

### `processPatternConditions`

Processes pattern conditions recursively and generates a string representation.

- **Parameters**:
  - `conditions`: The pattern condition object.
  - `operatorKeyword`: The keyword to be used before the condition (e.g., `NOT`).
  - `subOperator`: The sub-operator to be used between multiple conditions (e.g., `AND`, `OR`).
- **Returns**: The generated pattern conditions as a string.

### `patternConditions`

Generates SQL-like pattern conditions based on the provided input.

- **Parameters**:
  - `condition`: The `patternType` object containing conditions.
  - `subOperator` (optional): The sub-operator to be used between multiple conditions.
- **Returns**: The generated pattern conditions as a string.

## Usage

Example usage of the `patternConditions` module:

```typescript
import { patternConditions } from 'patternConditions';

const condition = {
    "$pattern": {
        field1: 'value1',
        "$or": {
            field2: 'value2',
            field3: 'value3'
        }
    },
    "$not_pattern": {
        field4: 'value4',
        "$and": {
            field5: 'value5',
            field6: 'value6'
        }
    }
};

const sqlPatternConditions = patternConditions(condition);
console.log(sqlPatternConditions);
```

This will output the SQL-like pattern conditions string based on the provided conditions.

---

This documentation provides a detailed explanation of the module's interface, functions, and their usage, helping users understand how to utilize the `patternConditions` module effectively.
