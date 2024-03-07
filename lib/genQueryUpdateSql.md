## genQueryUpdateSql Function

Generates a SQL UPDATE query string based on the provided parameters.

- **table**: The name of the table to update.
- **update_data**: An object containing the data to update.
- **condition**: The condition for updating the data.

```typescript
function genQueryUpdateSql({
    table: string,
    update_data: Record<string, any>,
    condition: string
}): string
```

### Parameters

- `table`: string - The name of the table to update.
- `update_data`: Record<string, any> - An object containing the data to update.
- `condition`: string - The condition for updating the data.

### Returns

- string: The generated SQL UPDATE query string.

### Example

```typescript
const query = genQueryUpdateSql({
    table: 'users',
    update_data: { name: 'John', age: 30 },
    condition: 'id = 1'
});
// Output: 'UPDATE users SET name="John", age=30 WHERE id = 1'
```
