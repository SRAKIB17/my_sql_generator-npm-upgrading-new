import { AndOrCondition } from "./type";
const simpleOperationRegex = /"(=|>|<|>=|<=|!=)":\s*\{[^{}]+\}/g;

const includeTypeRegex = /"\$include":\s*\{[^{}]+\}/g;
const notIncludeTypeRegex = /"\$not_include":\s*\{[^{}]+\}/g;
const patternTypeRegex = /"\$pattern":\s*\{[^{}]+\}/g;
const notPatternTypeRegex = /"\$not_pattern":\s*\{[^{}]+\}/g;
const betweenTypeRegex = /"\$between":\s*\{[^{}]+\}/g;
const notBetweenTypeRegex = /"\$not_between":\s*\{[^{}]+\}/g;


function generateMySQLCondition(condition: AndOrCondition): string {
    let mysqlCondition = "";
    // Handle simple operations
    // Handle include type
    // Handle not include type
    // Handle pattern type
    // Handle not pattern type
    // Handle between type
    // Handle other conditions
    // Remove the trailing " AND "

    return mysqlCondition;
}

const x = generateMySQLCondition({
    "!=": { name: "rakib" },
})

console.log(x)