/**
 * Defines the structure for the table list object.
 */
interface TableList {
    table1: string;
    table2?: string;
    table3?: string;
    table4?: string;
    table5?: string;
    table6?: string;
    table7?: string;
    table8?: string;
}

/**
 * Defines the structure for the relation key object.
 */
interface RelationKey {
    on?: RelationDetails;
    on1?: RelationDetails;
    on2?: RelationDetails;
    on3?: RelationDetails;
    on4?: RelationDetails;
    on5?: RelationDetails;
    on6?: RelationDetails;
    on7?: RelationDetails;
}

/**
 * Defines the structure for relation details.
 */
interface RelationDetails {
    relation?: 'JOIN' | 'INNER JOIN' | 'OUTER JOIN' | 'CROSS JOIN' | 'RIGHT JOIN' | 'LEFT JOIN';
    table1?: string;
    table2?: string;
    table3?: string;
    table4?: string;
    table5?: string;
    table6?: string;
    table7?: string;
    table8?: string;
}

/**
 * Defines the structure for specific columns.
 */
interface SpecificColumn {
    table1?: string[];
    table2?: string[];
    table3?: string[];
    table4?: string[];
    table5?: string[];
    table6?: string[];
    table7?: string[];
    table8?: string[];
}

/**
 * Defines the structure for limit and skip parameters.
 */
interface LimitSkip {
    limit?: string | number;
    skip?: string | number;
}

/**
 * Defines the structure for sorting criteria.
 */
interface Sort {
    table1?: [string, number];
    table2?: [string, number];
    table3?: [string, number];
    table4?: [string, number];
    table5?: [string, number];
    table6?: [string, number];
    table7?: [string, number];
    table8?: [string, number];
}

/**
 * Generates a SQL SELECT query string based on the provided parameters.
 * @param table_list - An object representing the tables involved in the query.
 * @param relation_key - An object representing the relations between tables.
 * @param specific_column - An object specifying specific columns to select from each table.
 * @param limitSkip - An object containing limit and skip values for pagination.
 * @param condition - Additional conditions for filtering the results.
 * @param sort - An object representing the sorting criteria.
 * @param havingCondition - Additional conditions for filtering results after grouping.
 * @param groupBY - An array specifying the columns for grouping.
 * @param min - Specifies the minimum value to be computed.
 * @param max - Specifies the maximum value to be computed.
 * @param count - Specifies the count value to be computed.
 * @param sum - Specifies the sum value to be computed.
 * @returns The generated SQL SELECT query string.
 */
declare function genQueryRdmsSql({
    table_list,
    relation_key,
    specific_column,
    limitSkip,
    condition,
    sort,
    havingCondition,
    groupBY,
    min,
    max,
    count,
    sum
}: {
    table_list: TableList;
    relation_key?: RelationKey;
    specific_column?: SpecificColumn;
    limitSkip?: LimitSkip;
    condition?: string;
    sort?: Sort;
    havingCondition?: string;
    groupBY?: string[];
    min?: string;
    max?: string;
    count?: string;
    sum?: string;
}): string;

/**
 * Exports the genQueryRdmsSql function as the default export.
 */
export default genQueryRdmsSql;
