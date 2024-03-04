import { includeType } from "./includeType"

interface simpleOperation {
    "="?: { [field_name: string]: number | string | unknown },
    ">"?: { [field_name: string]: number | string | unknown },
    "<"?: { [field_name: string]: number | string | unknown },
    ">="?: { [field_name: string]: number | string | unknown },
    "<="?: { [field_name: string]: number | string | unknown },
    "!="?: { [field_name: string]: number | string | unknown }
}



type pattern = {
    "$start"?: string | number,
    "$end"?: string | number,
    "$both"?: string | number,
}

interface patternType {
    "$pattern"?: {
        [field_name: string]: {
            "$start"?: string | number,
            "$end"?: string | number,
            "$both"?: string | number,
        }
        |
        {
            "$or"?: {
                [field_name: string]: pattern
            },
            "$and"?: {
                [field_name: string]: pattern
            }
        }
    },
    "$not_pattern"?: {
        [field_name: string]: {
            "$start"?: string | number,
            "$end"?: string | number,
            "$both"?: string | number,
        }
        |
        {
            "$or"?: {
                [field_name: string]: pattern
            },
            "$and"?: {
                [field_name: string]: pattern
            }
        }
    }
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