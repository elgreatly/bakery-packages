export class BakeryResultPackageModel {
    public constructor(init?: Partial<BakeryResultPackageModel>) {
        Object.assign(this, init);
    }
    pack: number;
    count: number;
    cost: number;
}