export class PackageItemModel {
    quantity: number;
    cost: number;

    constructor(init?: Partial<PackageItemModel>) {
        Object.assign(this, init);
    }
}