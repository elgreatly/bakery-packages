import { expect } from 'chai';
import 'mocha';
import { BakeryManager } from '../src/Managers/Bakery.manager';
import { BakeryResultPackageModel } from '../src/Models/BakeryResultPackage.model';
import { BakeryResultModel } from '../src/Models/BakeryResult.model';
import { BakeryRepository } from '../src/Repository/Bakery.repository';
import { PackageItemModel } from '../src/Models/PackageItem.model';
import { BakeryItemModel } from '../src/Models/BakeryItem.model';

describe('Bakery Manager', () => {
    let packages: PackageItemModel[];

    before(() => {
        const bakeryRepo = new BakeryRepository();
        packages = bakeryRepo.getAvailablePackages('vs5');
    });

    it('should return correct cost of packages', () => {
        let packages: BakeryResultPackageModel[] = [
            new BakeryResultPackageModel({
                pack: 5,
                count: 1,
                cost: 8.99
            }),
            new BakeryResultPackageModel({
                pack: 3,
                count: 2,
                cost: 6.99
            })
        ];

        const bakeryManager = new BakeryManager();
        let result = bakeryManager.getTotalCost(packages);
        
        expect(result).to.equal(22.97);
    });

    it('should add package and return the remain number of items', () => {
        const backeryItem = new BakeryItemModel({
            quantity: 8,
            type: 'vs5'
        });

        let resultPackage: BakeryResultModel = new BakeryResultModel({
            packages: []
        });

        const bakeryManager = new BakeryManager();
        let remain = bakeryManager.addResultPackage(resultPackage, backeryItem.quantity, 0, packages);

        expect(resultPackage.packages.length).to.equal(1);
        expect(resultPackage.packages[0].pack).to.equal(5);
        expect(resultPackage.packages[0].count).to.equal(1);
        expect(resultPackage.packages[0].cost).to.equal(8.99);
        expect(remain).to.equal(3);
    });

    it('should get all packages and return the remain 0 if it get exact match from the first try', () => {
        const backeryItem = new BakeryItemModel({
            quantity: 8,
            type: 'vs5'
        });
        let resultPackage: BakeryResultModel = new BakeryResultModel({
            packages: []
        });
        
        const bakeryManager = new BakeryManager();
        let remain = bakeryManager.getRmainAndAddPackages(resultPackage, backeryItem, 0, 1, packages);

        expect(resultPackage.packages.length).to.equal(2);
        expect(resultPackage.packages[0].pack).to.equal(5);
        expect(resultPackage.packages[0].count).to.equal(1);
        expect(resultPackage.packages[1].pack).to.equal(3);
        expect(resultPackage.packages[1].count).to.equal(1);
        expect(remain).to.equal(0);
    });

    it('should get all packages and return the remain not 0 if it is not get exact match from first try', () => {
        const backeryItem = new BakeryItemModel({
            quantity: 6,
            type: 'vs5'
        });
        let resultPackage: BakeryResultModel = new BakeryResultModel({
            packages: []
        });
        
        const bakeryManager = new BakeryManager();
        let remain = bakeryManager.getRmainAndAddPackages(resultPackage, backeryItem, 0, 1, packages);

        expect(resultPackage.packages.length).to.equal(1, 'length');
        expect(resultPackage.packages[0].pack).to.equal(5, 'pack');
        expect(resultPackage.packages[0].count).to.equal(1, 'count');
        expect(remain).to.equal(1, 'remain');
    });

    it('should return correct packages for number of items for specific type', () => {
        const backeryItem = new BakeryItemModel({
            quantity: 6,
            type: 'vs5'
        });
        
        const bakeryManager = new BakeryManager();
        let resultPackage = bakeryManager.getMinimumPackagesForItem(backeryItem);

        expect(resultPackage.packages.length).to.equal(1, 'length');
        expect(resultPackage.packages[0].pack).to.equal(3, 'pack');
        expect(resultPackage.packages[0].count).to.equal(2, 'count');
        expect(resultPackage.remain).to.equal(0, 'remain');
    });

    it('should return remain not 0 if there is no exact match', () => {
        const backeryItem = new BakeryItemModel({
            quantity: 7,
            type: 'vs5'
        });
        
        const bakeryManager = new BakeryManager();
        let resultPackage = bakeryManager.getMinimumPackagesForItem(backeryItem);

        expect(resultPackage.remain).to.equal(1, 'remain');
    });

    it('should return remain not with the number of input if the input less than minimum package', () => {
        const backeryItem = new BakeryItemModel({
            quantity: 2,
            type: 'vs5'
        });
        
        const bakeryManager = new BakeryManager();
        let resultPackage = bakeryManager.getMinimumPackagesForItem(backeryItem);

        expect(resultPackage.remain).to.equal(2, 'remain');
    });

    it('should return minimum number of packages for more than one type', () => {
        const backeryItems = [
            new BakeryItemModel({
                quantity: 8,
                type: 'vs5'
            }),
            new BakeryItemModel({
                quantity: 14,
                type: 'mb11'
            }),
        ];
        
        const bakeryManager = new BakeryManager();
        let resultPackage = bakeryManager.getMinimunPackges(backeryItems);

        expect(resultPackage[0].type).to.equal('vs5', 'VS5 Type');
        expect(resultPackage[0].remain).to.equal(0, 'VS5 remain');
        expect(resultPackage[0].packages.length).to.equal(2, 'VS5 Packages Length');
        expect(resultPackage[0].packages[0].pack).to.equal(5, 'VS5 First Package');
        expect(resultPackage[0].packages[0].count).to.equal(1, 'VS5 First Count');

        expect(resultPackage[1].type).to.equal('mb11', 'MB11 Type');
        expect(resultPackage[1].remain).to.equal(0, 'MB11 remain');
        expect(resultPackage[1].packages.length).to.equal(2, 'MB11 Packages Length');
        expect(resultPackage[1].packages[1].pack).to.equal(2, 'MB11 First Package');
        expect(resultPackage[1].packages[1].count).to.equal(3, 'MB11 First Count');
    });

});