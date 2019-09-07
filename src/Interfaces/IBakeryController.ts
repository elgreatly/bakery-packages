import { BakeryItemModel } from '../Models/BakeryItem.model';

export interface IBakeryController {
    bakeryItems: BakeryItemModel[];

    getPackges(input: string): string;
}
