export class PackageItemModel {
    public constructor(init?: Partial<PackageItemModel>) {
        Object.assign(this, init);
    }
    quantity: number;
    cost: number;
}