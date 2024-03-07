## genQueryRdmsSql Function

Generates a SQL SELECT query string for relational database management systems (RDMS) based on the provided parameters.

### Parameters

- `table_list`: { table1: string, ...table8?: string } - An object containing table names.
- `relation_key`: { "on"?: {...}, "on1"?: {...}, ... } - An object defining table relations.
- `specific_column`: { "table1"?: string[], ... } - An object defining specific columns to select.
- `limitSkip`: { limit?: string | number, skip?: string | number } - An object defining limit and skip for pagination.
- `condition`: string - A string defining SQL conditions.
- `sort`: { table1?: [string, number], ... } - An object defining sorting criteria.
- `havingCondition`: string - A string defining HAVING clause conditions.
- `groupBY`: string[] - An array defining columns for GROUP BY clause.
- `min`: string - A string defining the column to calculate the minimum value.
- `max`: string - A string defining the column to calculate the maximum value.
- `count`: string - A string defining the column to count.
- `sum`: string - A string defining the column to calculate the sum.

### Returns

- string: The generated SQL SELECT query string.

```typescript
function genQueryRdmsSql({
    table_list: { table1: string, ...table8?: string },
    relation_key?: { "on"?: {...}, "on1"?: {...}, ... },
    specific_column?: { "table1"?: string[], ... },
    limitSkip?: { limit?: string | number, skip?: string | number },
    condition?: string,
    sort?: { table1?: [string, number], ... },
    havingCondition?: string,
    groupBY?: string[],
    min?: string,
    max?: string,
    count?: string,
    sum?: string
}): string
```

### Example

```typescript
const query = genQueryRdmsSql({
    table_list: {
        table1: 'orders',
        table2: 'customers'
    },
    relation_key: {
        on: {
            relation: 'INNER JOIN',
            table1: 'orders',
            table2: 'customers',
        }
    },
    specific_column: {
        table1: ['order_id', 'order_date'],
        table2: ['customer_name']
    },
    condition: 'orders.status = "completed"',
    sort: { table1: ['order_date', 1] },
    groupBY: ['orders.status'],
    havingCondition: 'COUNT(customers.customer_id) > 10',
    limitSkip: { limit: 10, skip: 0 }
});
```

```sql
SELECT orders.order_id, orders.order_date, customers.customer_name 
FROM orders 
INNER JOIN customers ON orders.customer_id = customers.customer_id 
WHERE orders.status = "completed" 
GROUP BY orders.status 
HAVING COUNT(customers.customer_id) > 10 
ORDER BY order_date ASC 
LIMIT 0, 10
```
