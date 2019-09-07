import { BakeryResultPackageModel } from "./BakeryResultPackage.model";

export class BakeryResultModel {
    type: string;
    quantity: number;
    cost: number;
    packages: BakeryResultPackageModel[];
    remain: number;
    
    constructor(init?: Partial<BakeryResultModel>) {
        Object.assign(this, init);
    }
}