type include = {
}

export interface includeType {
    "$not_include"?: {
        "$or"?: { [field_name: string]: string[] | number[] | any[], },
        "$and"?: { [field_name: string]: string[] | number[] | any[], },
    } | { [field_name: string]: string[] | number[] | any[], }
    ,
    "$include"?: {
        "$or"?: { [field_name: string]: string[] | number[] | any[], },
        "$and"?: { [field_name: string]: string[] | number[] | any[], },
    } | { [field_name: string]: string[] | number[] | any[], },
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
