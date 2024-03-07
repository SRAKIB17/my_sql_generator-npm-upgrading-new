const inputObject = {
    "field6": [
        { "=": 60 },
        { "!=": 60 }
    ],
    "field81": { "!=": 60 },
    "field1": { "=": 10 },
    "field2": { "=": 200 }
};

function generateConditions(inputObject) {
    let conditions = [];
    for (const field in inputObject) {
        // if (Array.isArray(inputObject[field])) {
        //     const fieldConditions = inputObject[field].map(condition => {
        //         const operator = Object.keys(condition)[0];
        //         const value = condition[operator];
        //         return `${field} ${operator} ${value}`;
        //     });
        //     conditions = conditions.concat(fieldConditions);
        // } else {
        //     const operator = Object.keys(inputObject[field])[0];
        //     const value = inputObject[field][operator];
        //     conditions.push(`${field} ${operator} ${value}`);
        // }
    }
    return conditions.join(" AND ");
}

const sqlConditions = generateConditions(inputObject);
console.log(sqlConditions);
