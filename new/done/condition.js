
function processBetweenConditions(conditions, operatorKeyword, subOperator) {
    const subConditions = [];
    console.log(conditions)
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


const simpleOperationRegex = /"(=|>|<|>=|<=|!=)":\s*\{("[^"]+":\s*(?:"[^"]+"|\d+)),?\s*\}/g;

// Function to convert simple operation to SQL condition
function simpleOperationToSQL(operation) {
    const match = operation.match(/"(=|>|<|>=|<=|!=)":\s*\{(".*?"):\s*(.*?)\}/);
    const operator = match[1];
    const field = JSON.parse(match[2]);
    const value = JSON.stringify(match[3]);
    return `${field} ${operator} ${value}`;
}

function recursionGenerateMySql({ type, conditions, subOperator }) {

    if (["$not_between", "$between"]?.includes(type)) {
        let operatorBetweenKeyword = type?.includes('not') ? 'NOT' : '';
        return `(${processBetweenConditions(conditions, operatorBetweenKeyword, subOperator)})`;
    }
    else if (["$include", "$not_include"]?.includes(type)) {
        let includeOperatorKeyword = type?.includes('not') ? 'NOT IN' : 'IN';
        return `(${processIncludeConditions(conditions, includeOperatorKeyword, subOperator)})`;
    }
    else if (["$pattern", "$not_pattern"]?.includes(type)) {
        const operatorKeyword = type.includes('not') ? 'NOT' : '';
        return `(${processPatternConditions(conditions, operatorKeyword, subOperator)})`;
    }
    else if (["$and", "$or"]?.includes(type)) {
        const subOperator = type?.includes("or") ? "OR" : "AND";
        return `(${convertInputToSQL(conditions, subOperator)})`;
    }
    else {
        let subCondition = [];
        if (Array.isArray(conditions)) {
            const fieldConditions = conditions?.map(condition => {
                const operator = Object?.keys(condition)?.[0];
                const value = condition[operator];
                return `(${type} ${operator} ${JSON.stringify(value)})`;
            })?.join(` ${subOperator} `);
            subCondition.push(fieldConditions)
        }
        else {
            const operator = Object.keys(conditions)[0];
            const value = conditions?.[operator];
            subCondition.push(`(${type} ${operator} ${JSON.stringify(value)})`);
        }
        return subCondition.join(` ${subOperator} `);
    }
}


const inputObject = {
    "$or": {
        "field6": [
            { "=": 60 },
            { "!=": 60 }
        ],
        "field81": { "!=": 60 },
        "field814": { "!=": 60 },
        // "$pattern": {
        //     test2: `%5`,
        //     "$and": {
        //         test3: `%64%`,
        //         test14: `%644`,
        //         test24: `%5`,
        //     },
        //     "$or": {
        //         test: `%64%`,
        //         test1: `%644`,
        //         test2: `%5`,
        //     }
        // },
    },
    "field1": { "=": 10 },
    "field2": { "=": 200 },


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
    },
    "$not_include": {
        "$or": {
            test0: ['fsfl', 'flsdfs', 'fsdlfd'],
            test1: ['fsfl', 'flsdfs', 'fsdlfd'],
        },
        "$and": {
            test2: ['fsfl', 'flsdfs', 'fsdlfd'],
            test3: ['fsfl', 'flsdfs', 'fsdlfd'],
        }
    },
    "$include": {
        "$or": {
            test4: ['fsfl', 'flsdfs', 'fsdlfd'],
            test5: ['fsfl', 'flsdfs', 'fsdlfd'],
        },
        "$and": {
            test6: ['fsfl', 'flsdfs', 'fsdlfd'],
            test7: ['fsfl', 'flsdfs', 'fsdlfd'],
        }
    },
    "$between": {
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



function convertInputToSQL(input, subOperator = "AND") {
    let sqlConditions = "";
    let inputEntries = Object.entries(input);
    inputEntries.forEach(([type, conditions], index) => {
        sqlConditions += `${sqlConditions ? ` ${subOperator} ` : ""}${recursionGenerateMySql({
            conditions: conditions,
            type: type,
            subOperator: subOperator
        })}`
    })
    return sqlConditions?.trim();
}

const sqlConditionStatement = convertInputToSQL(inputObject);

if (sqlConditionStatement) {
    console.log("SQL condition statements:");
    console.log(sqlConditionStatement);
} else {
    console.log("No conditions found.");
}
