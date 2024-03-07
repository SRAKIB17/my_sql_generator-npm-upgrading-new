// ! ***************** simpleOperation ************************

interface simpleOperation {
    "="?: { [field_name: string]: number | string | unknown },
    ">"?: { [field_name: string]: number | string | unknown },
    "<"?: { [field_name: string]: number | string | unknown },
    ">="?: { [field_name: string]: number | string | unknown },
    "<="?: { [field_name: string]: number | string | unknown },
    "!="?: { [field_name: string]: number | string | unknown }
}
// ! ***************** simpleOperation ************************

// ! ***************** Include ************************
type $include = { [field_name: string]: string[] | number[] | any[], }

interface includeType {
    "$not_include"?: {
        "$or"?: $include,
        "$and"?: $include,
    } | $include
    ,
    "$include"?: {
        "$or"?: $include,
        "$and"?: $include,
    } | $include,
}


// ! ***************** Include ************************

// ! ***************** Patter ************************



interface patternType {
    "$pattern"?: {
        [field_name: string]: string |
        {
            "$or"?: {
                [field_name: string]: string
            },
            "$and"?: {
                [field_name: string]: string
            }
        }
    },
    "$not_pattern"?: {
        [field_name: string]: string |
        {
            "$or"?: {
                [field_name: string]: string
            },
            "$and"?: {
                [field_name: string]: string
            }
        }
    }
}

// ! ***************** Patter ************************
// ! ***************** betweenType ************************
type between = {
    [field_name: string]: {
        "$from": string | number,
        "$to": string | number,
    }
}

interface betweenType {
    "$between"?: between | {
        "$or"?: between,
        "$and"?: between
    },
    "$not_between"?: between | {
        "$or"?: between,
        "$and"?: between
    },
}

// ! ***************** betweenType ************************

interface AllCombine extends simpleOperation, includeType, patternType, betweenType, simpleOperation {
}

export interface AndOrCondition extends simpleOperation, includeType, patternType, betweenType {
    "$and"?: AllCombine,
    "$or"?: AllCombine,
    [field_name: string]: unknown
}

