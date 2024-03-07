## genQueryMultipleInsertSql Function

Generates a SQL INSERT query string for multiple records based on the provided table, insert data, and optional date field.

- **table**: string - The name of the table to insert data into.
- **insert_data**: Array<Record<string, any>> - An array of records containing data to insert into the table.
- **hasDate**: boolean (optional, default: false) - Indicates whether to include the current timestamp for a date field.
- **date_field**: string (optional) - The name of the date field.

### Parameters

- `table`: string - The name of the table to insert data into.
- `insert_data`: Array<Record<string, any>> - An array of records containing data to insert into the table.
- `hasDate`: boolean (optional, default: false) - Indicates whether to include the current timestamp for a date field.
- `date_field`: string (optional) - The name of the date field.

### Returns

- string: The generated SQL INSERT query string.

### Throws

- Error: Throws an error if the insert data array is empty.

### Example

```typescript
const insertData = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Jane' }
];
const query = genQueryMultipleInsertSql({ table: 'users', insert_data, hasDate: true, date_field: 'created_at' });
```

```sql
INSERT INTO users (id,name,created_at) VALUES (1,'John',CURRENT_TIMESTAMP),(2,'Doe',CURRENT_TIMESTAMP),(3,'Jane',CURRENT_TIMESTAMP)
```
