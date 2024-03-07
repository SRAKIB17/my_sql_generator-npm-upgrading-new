## genQueryInsertSql Function

Generates a SQL INSERT query string based on the provided table, insert data, and optional date field.

- **table**: string - The name of the table to insert data into.
- **insert_data**: object - The data to insert into the table.
- **hasDate**: boolean (optional, default: false) - Indicates whether to include the current timestamp for a date field.
- **date_field**: string (optional) - The name of the date field.

### Parameters

- `table`: string - The name of the table to insert data into.
- `insert_data`: object - The data to insert into the table.
- `hasDate`: boolean (optional, default: false) - Indicates whether to include the current timestamp for a date field.
- `date_field`: string (optional) - The name of the date field.

### Returns

- string: The generated SQL INSERT query string.

### Example

```typescript
const insertData = { name: 'John', age: 30 };
const query = genQueryInsertSql({ table: 'users', insert_data, hasDate: true, date_field: 'created_at' });
```

```sql
INSERT INTO users (name,age,created_at) VALUES ('John',30,CURRENT_TIMESTAMP)
```
