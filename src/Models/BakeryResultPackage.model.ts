export class BakeryResultPackageModel {
    pack: number;
    count: number;
    cost: number;

    constructor(init?: Partial<BakeryResultPackageModel>) {
        Object.assign(this, init);
    }
}
