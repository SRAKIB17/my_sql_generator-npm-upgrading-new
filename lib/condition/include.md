Certainly! Below is the documentation for the provided TypeScript declarations:

---

# Include Conditions

## Overview

The `includeConditions` module provides functions for processing and generating SQL-like include conditions. These conditions enable filtering based on the presence or absence of certain values in specified fields, with support for logical operators like `$or` and `$and`.

## Interfaces

### `$include`

Defines the structure of the `$include` condition object, specifying field names mapped to arrays of values.

- **Fields**: Field names mapped to arrays of values (strings, numbers, or any).

### `includeType`

Defines the structure of include conditions, including both positive (`$include`) and negative (`$not_include`) conditions.

- **`$not_include`**: Specifies negative include conditions.
- **`$include`**: Specifies positive include conditions.

## Functions

### `processIncludeConditions`

Processes include conditions recursively and generates a string representation.

- **Parameters**:
  - `conditions`: The include condition object.
  - `operatorKeyword`: The keyword to be used before the condition (e.g., `NOT`).
  - `subOperator`: The sub-operator to be used between multiple conditions (e.g., `AND`, `OR`).
- **Returns**: The generated include conditions as a string.

### `includeConditions`

Generates SQL-like include conditions based on the provided input.

- **Parameters**:
  - `condition`: The `includeType` object containing conditions.
  - `subOperator` (optional): The sub-operator to be used between multiple conditions.
- **Returns**: The generated include conditions as a string.

## Usage

Example usage of the `includeConditions` module:

```typescript
import { includeConditions } from 'includeConditions';

const condition = {
    "$include": {
        "$or": {
            field1: ['value1', 'value2'],
            field2: [1, 2, 3]
        },
        "$and": {
            field3: ['value3', 'value4']
        }
    },
    "$not_include": {
        field4: ['value5'],
        "$or": {
            field5: ['value6', 'value7']
        }
    }
};

const sqlIncludeConditions = includeConditions(condition);
console.log(sqlIncludeConditions);
```

This will output the SQL-like include conditions string based on the provided conditions.

---

This documentation provides a comprehensive explanation of the module's interfaces, functions, and their usage, enabling users to effectively utilize the `includeConditions` module.
