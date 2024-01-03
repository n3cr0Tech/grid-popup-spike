import { ContactModel } from "./ContactModel"
import { CustomOrderModel } from "./CustomOrderModel"

export type CustomOrderParentModel = {
    ContactModel: ContactModel,
    CustomOrderModel: CustomOrderModel
}