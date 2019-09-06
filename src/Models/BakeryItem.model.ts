export class BakeryItemModel {
    public constructor(init?: Partial<BakeryItemModel>) {
        Object.assign(this, init);
    }
    type: string;
    quantity: number;

    static getBakeryItems(input: string): BakeryItemModel[] {
        let inputs = input.split(',');
        let bakeryItems: BakeryItemModel[] = [];
        inputs.forEach(item => {
            bakeryItems.push(this.getBakeryItem(item));
        });

        return bakeryItems;
    }

    private static getBakeryItem(item: string): BakeryItemModel {
        let itemSplited = item.split(' ');
        return new BakeryItemModel({
            type: itemSplited[1],
            quantity: parseInt(itemSplited[0])
        });
    }
}