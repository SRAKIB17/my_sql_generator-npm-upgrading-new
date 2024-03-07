here's the documentation for the provided TypeScript declarations:

---

# Simple Operation Conditions

## Overview

The `simpleOperationConditions` module provides functions for processing and converting simple operation conditions in SQL queries. These conditions include basic comparison operations such as equality, inequality, greater than, less than, etc.

## Types

### `simpleOp`

Represents the structure of simple operation conditions.

- `=`: Equals
- `>`: Greater than
- `<`: Less than
- `>=`: Greater than or equal to
- `<=`: Less than or equal to
- `!=`: Not equal to

### `simpleOperation`

Defines a simple operation condition for a specific field.

- **Field Name**: The name of the field to apply the condition to.
- **Value**: Can be a single simple operation or an array of simple operations.

### `simpleOperationConditionType`

Extends `simpleOperation` to include logical operators (`$and` and `$or`) for combining multiple conditions.

- **`$and`**: Specifies conditions that must all be true.
- **`$or`**: Specifies conditions where at least one must be true.

## Functions

### `processSimpleOperationConditions`

Processes simple operation conditions into SQL format.

- **Parameters**:
  - `conditions`: The conditions to process.
  - `subOperator`: The sub-operator to use when combining multiple conditions.
  - `type`: The type of condition (e.g., `$and`, `$or`).
- **Returns**: The processed SQL condition string.

### `simpleOperationConditions`

Converts simple operation conditions into SQL format.

- **Parameters**:
  - `condition`: The condition to convert.
  - `subOperator` (optional): The sub-operator to use when combining multiple conditions.
- **Returns**: The SQL condition string.

## Usage

Example usage of the `simpleOperationConditions` module:

```typescript
import { simpleOperationConditions } from 'simpleOperationConditions';

const condition = {
    field1: { '>': 10 },
    $and: {
        field2: { '<=': 20 },
        field3: { '=': 'value' }
    }
};

const sqlCondition = simpleOperationConditions(condition);
console.log(sqlCondition);
```

This will output the SQL condition string based on the provided conditions.

---

This documentation provides a comprehensive explanation of the module's types, functions, and their usage, helping users understand how to utilize the `simpleOperationConditions` module effectively.
