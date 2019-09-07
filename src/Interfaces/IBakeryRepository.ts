import { PackageItemModel } from "../Models/PackageItem.model";

export interface IBakeryRepository {
    getAvailablePackages(type: string): PackageItemModel[];
}