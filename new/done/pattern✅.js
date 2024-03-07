const inputObject = {
    "$pattern": {
        test2: `%5`,
        "$and": {
            test3: `%64%`,
            test14: `%644`,
            test24: `%5`,
        },
        "$or": {
            test: `%64%`,
            test1: `%644`,
            test2: `%5`,
        }
    },
    "$not_pattern": {
        test2: `%5`,
        "$and": {
            test3: `%64%`,
            test14: `%644`,
            test24: `%5`,
        },
        "$or": {
            test: `%64%`,
            test1: `%644`,
            test2: `%5`,
        }
    }
};

function processPatternConditions(conditions, operatorKeyword, subOperator) {
    const subConditions = [];
    for (const [key, value] of Object.entries(conditions)) {
        const subOperator = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && ["$or", "$and"]?.includes(key)) {
            const subCondition = processPatternConditions(value, operatorKeyword, subOperator);
            subConditions.push(`(${subCondition})`);
        }
        else {
            let condition = `${key} ${operatorKeyword ? `${operatorKeyword} ` : ""}LIKE ${JSON.stringify(value)}`;
            subConditions.push(`(${condition})`);
        }
    }
    return subConditions.join(` ${subOperator} `);
}

function convertInputToSQL(input) {
    let sqlConditions = '';
    let inputEntries = Object.entries(input);
    inputEntries.forEach(([type, conditions], index) => {
        const operatorKeyword = type.includes('not') ? 'NOT' : '';
        sqlConditions += `${index > 0 ? " AND " : ""}(${processPatternConditions(conditions, operatorKeyword, "AND")})`;
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
