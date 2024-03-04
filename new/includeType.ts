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
