## genQuerySelectSql Function

Generates a SQL SELECT query string based on the provided parameters.

- **table**: The name of the table to select data from.
- **limitSkip**: An object containing limit and skip values for pagination.
- **condition**: Additional conditions for filtering the results.
- **sort**: An object representing the sorting criteria.
- **havingCondition**: Additional conditions for filtering results after grouping.
- **groupBY**: An array specifying the columns for grouping.
- **specific_column**: An array specifying specific columns to select.
- **min**: Specifies the minimum value to be computed.
- **max**: Specifies the maximum value to be computed.
- **count**: Specifies the count value to be computed.
- **sum**: Specifies the sum value to be computed.

```typescript
function genQuerySelectSql({
    table: string,
    limitSkip?: { limit?: string | number; skip?: string | number },
    condition?: string,
    sort?: any,
    havingCondition?: string,
    groupBY?: string[],
    specific_column?: string[],
    min?: string,
    max?: string,
    count?: string,
    sum?: string
}): string
```

### Parameters

- `table`: string - The name of the table to select data from.
- `limitSkip`: { limit?: string | number; skip?: string | number } - An object containing limit and skip values for pagination.
- `condition`: string - Additional conditions for filtering the results.
- `sort`: any - An object representing the sorting criteria.
- `havingCondition`: string - Additional conditions for filtering results after grouping.
- `groupBY`: string[] - An array specifying the columns for grouping.
- `specific_column`: string[] - An array specifying specific columns to select.
- `min`: string - Specifies the minimum value to be computed.
- `max`: string - Specifies the maximum value to be computed.
- `count`: string - Specifies the count value to be computed.
- `sum`: string - Specifies the sum value to be computed.

### Returns

- string: The generated SQL SELECT query string.

### Example

```typescript
const query = genQuerySelectSql({
    table: 'users',
    limitSkip: { limit: 10, skip: 0 },
    condition: 'age > 18',
    sort: { name: 1 },
    groupBY: ['country'],
    havingCondition: 'count(age) > 100',
    specific_column: ['name', 'age'],
    sum: 'salary'
});
```

```sql
SELECT name, age, sum(salary) as summation FROM users WHERE age > 18 GROUP BY country HAVING count(age) > 100 ORDER BY name ASC LIMIT 0, 10
```
