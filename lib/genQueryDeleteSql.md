## genQueryDeleteSql Function

Generates a SQL DELETE query string based on the provided table and condition.

- **table**: string - The name of the table from which to delete records.
- **condition**: string (optional) - The condition to apply to the DELETE operation.

### Parameters

- `table`: string - The name of the table from which to delete records.
- `condition`: string (optional) - The condition to apply to the DELETE operation.

### Returns

- string: The generated SQL DELETE query string.

### Example

```typescript
const query = genQueryDeleteSql({ table: 'users', condition: 'age > 50' });
```

```sql
DELETE FROM users WHERE age > 50
```
