// ! ***************** simpleOperation ************************

type simpleOp =
    { "="?: number | string | unknown } |
    { ">"?: number | string | unknown } |
    { "<"?: number | string | unknown } |
    { ">="?: number | string | unknown } |
    { "<="?: number | string | unknown } |
    { "!="?: number | string | unknown }

export interface simpleOperation {
    [field_name: string]: simpleOp | simpleOp[]
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

// ! ***************** Pattern ************************



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

// ! ***************** Pattern ************************
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

// interface AllCombine extends simpleOperation, includeType, patternType, betweenType { }

export interface AndOrCondition extends simpleOperation, includeType, patternType, betweenType {
    "$and"?: any,
    "$or"?: any
}
