const inputObject = {
    "$between": {
        test90: {
            "$from": 30,
            "$to": 50
        },
        "$and": {
            test9: {
                "$from": 30,
                "$to": 50
            },
            test10: {
                "$from": 30,
                "$to": 50
            },
        },
        "$or": {
            test11: {
                "$from": 30,
                "$to": 50
            },
            test12: {
                "$from": 30,
                "$to": 50
            },
        }
    },
    "$not_between": {
        test900: {
            "$from": 30,
            "$to": 50
        },
        "$and": {
            test13: {
                "$from": 30,
                "$to": 50
            },
            test14: {
                "$from": 30,
                "$to": 50
            },
        },
        "$or": {
            test15: {
                "$from": 30,
                "$to": 50
            },
            test16: {
                "$from": 30,
                "$to": 50
            },
        }
    }
};

export function processBetweenConditions(conditions, operatorKeyword, subOperator) {
    const subConditions = [];
    for (const [key, value] of Object.entries(conditions)) {
        const subOperator = key === "$or" ? "OR" : "AND";
        if (typeof value === 'object' && ["$or", "$and"]?.includes(key)) {
            const subCondition = processBetweenConditions(value, operatorKeyword, subOperator);
            subConditions.push(`(${subCondition})`);
        }
        else {
            const from = value?.$from;
            const to = value?.$to;
            let condition = `${operatorKeyword ? `${operatorKeyword} ` : ""}${key} BETWEEN ${JSON.stringify(from)} AND ${JSON.stringify(to)}`;
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
        sqlConditions += `${index > 0 ? " AND " : ""}${processBetweenConditions(conditions, operatorKeyword, "AND")}`;
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
