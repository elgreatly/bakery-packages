import { BakeryItemModel } from "../Models/BakeryItem.model";
import { BakeryResultModel } from "../Models/BakeryResult.model";
import { PackageItemModel } from "../Models/PackageItem.model";
import { BakeryResultPackageModel } from "../Models/BakeryResultPackage.model";

export interface IBakeryManager {
    getMinimunPackges(bakeryItems: BakeryItemModel[]): BakeryResultModel[];
    getPackagesForItems(bakeryItem: BakeryItemModel): BakeryResultModel;
    getRmainAndAddPackages(resultPackage: BakeryResultModel, bakeryItem: BakeryItemModel, firstIndex: number, nextIndex: number, packages: PackageItemModel[]): number;
    addResultPackage(resultPackage: BakeryResultModel, quantity: number, packIndex: number, packages: PackageItemModel[]): number;
    getTotalCost(packages: BakeryResultPackageModel[]): number;
}