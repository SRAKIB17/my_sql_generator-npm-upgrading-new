const inputObject = {
    "$not_include": {
        test: ['fsfl', 'flsdfs', 'fsdlfd'],
        "$or": {
            test0: ['fsfl', 'flsdfs', 'fsdlfd'],
            test1: ['fsfl', 'flsdfs', 'fsdlfd'],
        },
        "$and": {
            test24: ['fsfl', 'flsdfs', 'fsdlfd'],
            test3: ['fsfl', 'flsdfs', 'fsdlfd'],
        }
    },
    "$include": {
        test44: ['fsfl', 'flsdfs', 'fsdlfd'],
        "$or": {
            test4: ['fsfl', 'flsdfs', 'fsdlfd'],
            test5: ['fsfl', 'flsdfs', 'fsdlfd'],
        },
        "$and": {
            test6: ['fsfl', 'flsdfs', 'fsdlfd'],
            test7: ['fsfl', 'flsdfs', 'fsdlfd'],
        }
    },
};

function processIncludeConditions(conditions, operatorKeyword, subOperator) {
    const subConditions = [];
    for (const [key, value] of Object.entries(conditions)) {
        const subOperator = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && !Array.isArray(value)) {
            const subCondition = processIncludeConditions(value, operatorKeyword, subOperator);
            subConditions.push(`(${subCondition})`);
        } else {
            const conditionsList = [];
            if (Array.isArray(value)) {
                // const valuesStr = value.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
                const valuesStr = JSON.stringify(value)?.slice(1, -1);
                conditionsList.push(`${key} ${operatorKeyword} (${valuesStr})`);
            }
            else {
                conditionsList.push(`${key} ${operatorKeyword} (${JSON.stringify(value)?.slice(1, -1)})`);
            }
            subConditions.push(conditionsList.join(` ${subOperator} `));
        }
    }
    return subConditions.join(` ${subOperator} `);
}

function convertInputToSQL(input) {
    let sqlConditions = '';
    let inputEntries = Object.entries(input);
    inputEntries.forEach(([type, conditions], index) => {
        const operatorKeyword = type.includes('not') ? 'NOT IN' : 'IN';
        sqlConditions += `${index > 0 ? " AND " : ""}(${processIncludeConditions(conditions, operatorKeyword, "AND")})`;
    })
    return sqlConditions.trim();
}

const sqlConditionStatement = convertInputToSQL(inputObject);

if (sqlConditionStatement) {
    console.log("SQL condition statements:");
    console.log(sqlConditionStatement);
} else {
    console.log("No conditions found.");
}
