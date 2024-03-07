const inputObject = {
    "!=": { "field6": 60 },
    "$and": {
        "!=": { "field6": 60 },
        "=": { "field81": 10 },
    },
    "$or": {
        "=": { "field1": 10 },
        ">": { "field2": 200 },
    },
};

const simpleOperationRegex = /"(=|>|<|>=|<=|!=)":\s*\{("[^"]+":\s*(?:"[^"]+"|\d+)),?\s*\}/g;

// Function to convert simple operation to SQL condition
function simpleOperationToSQL(operation) {
    const match = operation.match(/"(=|>|<|>=|<=|!=)":\s*\{(".*?"):\s*(.*?)\}/);
    const operator = match[1];
    const field = JSON.parse(match[2]);
    const value = JSON.stringify(match[3]);
    return `${field} ${operator} ${value}`;
}

// Function to convert input object to SQL condition statements
function convertInputToSQL(input) {
    const conditions = [];
    for (const [key, value] of Object.entries(input)) {
        if (key === "$and" || key === "$or") {
            const subConditions = [];
            for (const [subKey, subValue] of Object.entries(value)) {
                const subCondition = convertInputToSQL({ [subKey]: subValue });
                subConditions.push(subCondition);
            }
            conditions.push(`(${subConditions.join(` ${key.slice(1).toUpperCase()} `)})`);
        }
        else {
            const simpleOperations = JSON.stringify({ [key]: value }).match(simpleOperationRegex);
            if (simpleOperations) {
                simpleOperations.forEach(operation => {
                    conditions.push(simpleOperationToSQL(operation));
                });
            }
        }
    }
    return conditions.join(" AND ");
}

// Convert input object to SQL condition statements
const sqlConditionStatement = convertInputToSQL(inputObject);
// Print SQL condition statements
if (sqlConditionStatement) {
    console.log("SQL condition statements:");
    console.log(sqlConditionStatement);
}
else {
    console.log("No conditions found.");
}
