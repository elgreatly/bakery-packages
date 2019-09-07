export class BakeryItemModel {
    type: string;
    quantity: number;

    constructor(init?: Partial<BakeryItemModel>) {
        Object.assign(this, init);
    }

    static getBakeryItems(input: string): BakeryItemModel[] {
        const inputs = input.split(',');
        const bakeryItems: BakeryItemModel[] = [];

        inputs.forEach(item => {
            bakeryItems.push(this.getBakeryItem(item));
        });

        return bakeryItems;
    }

    private static getBakeryItem(item: string): BakeryItemModel {
        const itemSplited = item.split(' ');

        return new BakeryItemModel({
            type: itemSplited[1],
            quantity: parseInt(itemSplited[0])
        });
    }
}
