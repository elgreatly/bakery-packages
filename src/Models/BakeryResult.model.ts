import { BakeryResultPackageModel } from "./BakeryResultPackage.model";

export class BakeryResultModel {
    public constructor(init?: Partial<BakeryResultModel>) {
        Object.assign(this, init);
    }
    type: string;
    quantity: number;
    cost: number;
    isFitPackages: boolean;
    packages: BakeryResultPackageModel[];
    remain: number;
}