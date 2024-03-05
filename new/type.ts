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

type $pattern = {
    "$start"?: string | number,
    "$end"?: string | number,
    "$both"?: string | number,
}

interface patternType {
    "$pattern"?: {
        [field_name: string]: $pattern |
        {
            "$or"?: {
                [field_name: string]: $pattern
            },
            "$and"?: {
                [field_name: string]: $pattern
            }
        }
    },
    "$not_pattern"?: {
        [field_name: string]: $pattern |
        {
            "$or"?: {
                [field_name: string]: $pattern
            },
            "$and"?: {
                [field_name: string]: $pattern
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



export interface AndOrCondition extends simpleOperation, includeType, patternType, betweenType {
    "$and"?: simpleOperation,
    "$or"?: simpleOperation,
    [field_name: string]: unknown
}

