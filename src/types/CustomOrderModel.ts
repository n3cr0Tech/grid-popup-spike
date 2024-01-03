import { CustomItem } from "./CustomItem"

export type CustomOrderModel = {
    items: CustomItem[],
    dateCreated: Date,
    dateDue: Date
}