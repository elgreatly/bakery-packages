import { BakeryItemModel } from "../Models/BakeryItem.model";
import { BakeryResultModel } from "../Models/BakeryResult.model";
import { BakeryRepository } from "../Repository/Bakery.repository";
import { IBakeryManager } from "../Interfaces/IBakeryManager";
import { PackageItemModel } from "../Models/PackageItem.model";
import { BakeryResultPackageModel } from "../Models/BakeryResultPackage.model";

export class BakeryManager implements IBakeryManager {
    
    getMinimunPackges(bakeryItems: BakeryItemModel[]): BakeryResultModel[] {
        let result: BakeryResultModel[] = [];
        
        bakeryItems.forEach(bakeryItem => {
            let typePackages = this.getPackagesForItems(bakeryItem);
            typePackages.type = bakeryItem.type;
            typePackages.quantity = bakeryItem.quantity;
            typePackages.cost = this.getTotalCost(typePackages.packages);
            result.push(typePackages);
        });

        return result;
    }

    getPackagesForItems(bakeryItem: BakeryItemModel): BakeryResultModel {
        let resultPackage: BakeryResultModel = new BakeryResultModel();
        let bakeryRepository =  new BakeryRepository();
        let packages = bakeryRepository.getAvailablePackages(bakeryItem.type);
        let remain = bakeryItem.quantity;
        let i = 0;
        let j = 1;

        while (remain !== 0) {
            // break when checked all cases and still not found any correct match 
            if (i === packages.length) break;

            resultPackage.packages = [];

            remain = this.getRmainAndAddPackages(resultPackage, bakeryItem, i, j, packages);
            
            // if in this case not exact match the items try the next case ex: if we have packages 8, 5, 3
            // and 8, 5, 3 not match then try 8, 3 without 5
            if (remain) j++;
            
            // if all cases with the same base not get exact match then try with the next base
            // ex: if 8, 5, 3 and 8, 3 not get the exact match then go to the next base 5 and continue 5, 3 
            if (j >= packages.length) {
                i++;
                j = i + 1;
            }
        }

        resultPackage.remain = remain;

        return resultPackage;
    }

    // get last remain items and all minmum number of packages 
    getRmainAndAddPackages(resultPackage: BakeryResultModel, bakeryItem: BakeryItemModel, 
        firstIndex: number, nextIndex: number, packages: PackageItemModel[]): number {
        let remain = this.addResultPackage(resultPackage, bakeryItem.quantity, firstIndex, packages);

        for (let packIndex = nextIndex; packIndex < packages.length; packIndex++) {
            if (remain >= packages[packIndex].quantity) {
                remain = this.addResultPackage(resultPackage, remain, packIndex, packages);
            } else {
                break;
            }
        }

        return remain;
    }

    // get remain and add one package item result
    addResultPackage(resultPackage: BakeryResultModel, quantity: number, 
        packIndex: number, packages: PackageItemModel[]) {
        let numbers = Math.floor(quantity / packages[packIndex].quantity);
        let remain = quantity % packages[packIndex].quantity;
        
        resultPackage.packages.push({
            pack: packages[packIndex].quantity,
            count: numbers,
            cost: packages[packIndex].cost
        });

        return remain;
    }

    getTotalCost(packages: BakeryResultPackageModel[]): number {
        let totalCost = 0;
        packages.forEach(packItem => {
            totalCost += packItem.count * packItem.cost;
        });

        return totalCost;
    }
}