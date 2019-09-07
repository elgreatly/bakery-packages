import BakeryConstants from "../Constants/Bakery.constant";
import { PackageItemModel } from "../Models/PackageItem.model";
import { IBakeryRepository } from "../Interfaces/IBakeryRepository";

export class BakeryRepository implements IBakeryRepository {
    getAvailablePackages(type: string): PackageItemModel[] {
        return BakeryConstants.BAKERY_PACKAGES[type];
    }
}