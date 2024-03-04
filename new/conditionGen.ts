interface simpleOperation {
    "="?: { [field_name: string]: number | string | unknown },
    ">"?: { [field_name: string]: number | string | unknown },
    "<"?: { [field_name: string]: number | string | unknown },
    ">="?: { [field_name: string]: number | string | unknown },
    "<="?: { [field_name: string]: number | string | unknown },
    "!="?: { [field_name: string]: number | string | unknown }
}
interface includeType {
    "$not_include"?: {
        "$or"?: simpleOperation,
        "$and"?: simpleOperation,
    } | { [field_name: string]: string[] | number[] | any[], }
    ,
    "$include"?: {
        "$or"?: simpleOperation,
        "$and"?: simpleOperation,
    } | { [field_name: string]: string[] | number[] | any[], },
}

interface patternType {
    "$pattern"?: {
        [field_name: string]: {
            "$start"?: string | number,
            "$end"?: string | number,
            "$both"?: string | number,
        } | {
            "$or"?: simpleOperation,
            "$and"?: simpleOperation,
        }
    },
    "$not_pattern"?: {
        [field_name: string]: {
            "$start"?: string | number,
            "$end"?: string | number,
            "$both"?: string | number,
        } | {
            "$or"?: simpleOperation,
            "$and"?: simpleOperation,
        }
    },
}

interface betweenType {
    "$between"?: {
        [field_name: string]: {
            "$from": string | number,
            "$to": string | number,
        } | any,
        "$or"?: any,
        "$and"?: any
    },
}

interface AndOrCondition extends simpleOperation, includeType, patternType {


    [field_name: string]: unknown
}


function conditionGen(props: AndOrCondition) {
    return 534
}

const condition = conditionGen({
    "!=": {
        test: 53
    },
    "name": 534,
    $include: {

    }
})

console.log(condition)