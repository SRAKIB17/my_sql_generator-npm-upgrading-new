function generateMySQLCondition(condition: AndOrCondition): string {
    let mysqlCondition = "";
    const operators: { [key: string]: string } = {
        "=": "=",
        ">": ">",
        "<": "<",
        ">=": ">=",
        "<=": "<=",
        "!=": "!="
    };

    // Handle simple operations
    for (const operator in condition) {
        if (operator in operators) {
            const fields = condition[operator];
            for (const field in fields) {
                const value = fields[field];
                if (typeof value === "string") {
                    mysqlCondition += `${field} ${operators[operator]} '${value}' AND `;
                } else if (typeof value === "number") {
                    mysqlCondition += `${field} ${operators[operator]} ${value} AND `;
                }
            }
        }
    }

    // Handle include type
    if (condition["$include"]) {
        const includes = condition["$include"];
        for (const field in includes) {
            const values = includes[field];
            mysqlCondition += `${field} IN (${values.map(val => typeof val === "string" ? `'${val}'` : val).join(", ")}) AND `;
        }
    }

    // Handle not include type
    if (condition["$not_include"]) {
        const notIncludes = condition["$not_include"];
        if ("$or" in notIncludes) {
            const orConditions = notIncludes["$or"];
            mysqlCondition += `NOT (`;
            for (const field in orConditions) {
                const values = orConditions[field];
                mysqlCondition += `${field} IN (${values.map(val => typeof val === "string" ? `'${val}'` : val).join(", ")}) OR `;
            }
            mysqlCondition = mysqlCondition.slice(0, -4); // Remove the last " OR "
            mysqlCondition += `) AND `;
        } else if ("$and" in notIncludes) {
            const andConditions = notIncludes["$and"];
            for (const field in andConditions) {
                const values = andConditions[field];
                mysqlCondition += `NOT (${field} IN (${values.map(val => typeof val === "string" ? `'${val}'` : val).join(", ")})) AND `;
            }
        } else {
            const values = notIncludes;
            mysqlCondition += `NOT (${field} IN (${values.map(val => typeof val === "string" ? `'${val}'` : val).join(", ")})) AND `;
        }
    }

    // Handle pattern type
    if (condition["$pattern"]) {
        const patterns = condition["$pattern"];
        for (const field in patterns) {
            const pattern = patterns[field];
            if (pattern && ("$start" in pattern || "$end" in pattern || "$both" in pattern)) {
                if ("$start" in pattern) {
                    mysqlCondition += `${field} LIKE '${pattern["$start"]}% AND `;
                }
                if ("$end" in pattern) {
                    mysqlCondition += `${field} LIKE '%${pattern["$end"]}' AND `;
                }
                if ("$both" in pattern) {
                    mysqlCondition += `${field} LIKE '%${pattern["$both"]}%' AND `;
                }
            } else if ("$or" in pattern) {
                const orPatterns = pattern["$or"];
                mysqlCondition += "(";
                for (const orField in orPatterns) {
                    const orPattern = orPatterns[orField];
                    if (orPattern && ("$start" in orPattern || "$end" in orPattern || "$both" in orPattern)) {
                        mysqlCondition += "(";
                        if ("$start" in orPattern) {
                            mysqlCondition += `${orField} LIKE '${orPattern["$start"]}%' OR `;
                        }
                        if ("$end" in orPattern) {
                            mysqlCondition += `${orField} LIKE '%${orPattern["$end"]}' OR `;
                        }
                        if ("$both" in orPattern) {
                            mysqlCondition += `${orField} LIKE '%${orPattern["$both"]}%' OR `;
                        }
                        mysqlCondition = mysqlCondition.slice(0, -4); // Remove the last " OR "
                        mysqlCondition += ") AND ";
                    }
                }
                mysqlCondition = mysqlCondition.slice(0, -5); // Remove the last " AND "
                mysqlCondition += ") AND ";
            }
        }
    }

    // Handle not pattern type
    if (condition["$not_pattern"]) {
        const notPatterns = condition["$not_pattern"];
        if ("$or" in notPatterns) {
            const orPatterns = notPatterns["$or"];
            mysqlCondition += "NOT (";
            for (const field in orPatterns) {
                const pattern = orPatterns[field];
                if (pattern && ("$start" in pattern || "$end" in pattern || "$both" in pattern)) {
                    mysqlCondition += "(";
                    if ("$start" in pattern) {
                        mysqlCondition += `${field} LIKE '${pattern["$start"]}%' OR `;
                    }
                    if ("$end" in pattern) {
                        mysqlCondition += `${field} LIKE '%${pattern["$end"]}' OR `;
                    }
                    if ("$both" in pattern) {
                        mysqlCondition += `${field} LIKE '%${pattern["$both"]}%' OR `;
                    }
                    mysqlCondition = mysqlCondition.slice(0, -4); // Remove the last " OR "
                    mysqlCondition += ") AND ";
                }
            }
            mysqlCondition = mysqlCondition.slice(0, -5); // Remove the last " AND "
            mysqlCondition += ") AND ";
        } else if ("$and" in notPatterns) {
            const andPatterns = notPatterns["$and"];
            for (const field in andPatterns) {
                const pattern = andPatterns[field];
                if (pattern && ("$start" in pattern || "$end" in pattern || "$both" in pattern)) {
                    mysqlCondition += "NOT (";
                    if ("$start" in pattern) {
                        mysqlCondition += `${field} LIKE '${pattern["$start"]}%' AND `;
                    }
                    if ("$end" in pattern) {
                        mysqlCondition += `${field} LIKE '%${pattern["$end"]}' AND `;
                    }
                    if ("$both" in pattern) {
                        mysqlCondition += `${field} LIKE '%${pattern["$both"]}%' AND `;
                    }
                    mysqlCondition = mysqlCondition.slice(0, -5); // Remove the last " AND "
                    mysqlCondition += ") AND ";
                }
            }
        }
    }

    // Handle between type
    // Skipping for brevity, as it's more complex to handle
    if (condition["$between"]) {
        const betweenConditions = condition["$between"];
        if ("$or" in betweenConditions) {
            const orConditions = betweenConditions["$or"];
            mysqlCondition += "(";
            for (const field in orConditions) {
                const betweenValues = orConditions[field];
                mysqlCondition += "(";
                mysqlCondition += `${field} BETWEEN '${betweenValues["$from"]}' AND '${betweenValues["$to"]}' OR `;
                mysqlCondition = mysqlCondition.slice(0, -4); // Remove the last " OR "
                mysqlCondition += ") AND ";
            }
            mysqlCondition = mysqlCondition.slice(0, -5); // Remove the last " AND "
            mysqlCondition += ") AND ";
        } else if ("$and" in betweenConditions) {
            const andConditions = betweenConditions["$and"];
            for (const field in andConditions) {
                const betweenValues = andConditions[field];
                mysqlCondition += "(";
                mysqlCondition += `${field} BETWEEN '${betweenValues["$from"]}' AND '${betweenValues["$to"]}' AND `;
                mysqlCondition = mysqlCondition.slice(0, -5); // Remove the last " AND "
                mysqlCondition += ") AND ";
            }
        } else {
            const betweenValues = betweenConditions;
            for (const field in betweenValues) {
                mysqlCondition += `${field} BETWEEN '${betweenValues["$from"]}' AND '${betweenValues["$to"]}' AND `;
            }
        }
    }

    // Handle other conditions
    for (const field in condition) {
        if (!["$and", "$or", "$include", "$not_include", "$pattern", "$not_pattern", "$between"].includes(field)) {
            // Assuming the field is a simple operation
            for (const operator in condition[field]) {
                const value = condition[field][operator];
                if (typeof value === "string") {
                    mysqlCondition += `${field} ${operators[operator]} '${value}' AND `;
                } else if (typeof value === "number") {
                    mysqlCondition += `${field} ${operators[operator]} ${value} AND `;
                }
            }
        }
    }

    // Remove the trailing " AND "
    mysqlCondition = mysqlCondition.slice(0, -5);

    return mysqlCondition;
}
