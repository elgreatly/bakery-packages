import { BakeryItemModel } from '../Models/BakeryItem.model';
import { BakeryManager } from '../Managers/Bakery.manager';
import BakeryConstants from '../Constants/Bakery.constant';
import { IBakeryController } from '../Interfaces/IBakeryController';

export class BakeryController implements IBakeryController {
    bakeryItems: BakeryItemModel[];

    getPackges(input: string): string {
        let result = '';
        let isTypesExist = true;
        this.bakeryItems = BakeryItemModel.getBakeryItems(input.toLowerCase());

        this.bakeryItems.forEach(bakeryItem => {
            if (BakeryConstants.BAKERY_TYPES.indexOf(bakeryItem.type) === -1) {
                isTypesExist = false;
            }
        });

        if (!isTypesExist) {
            result += 'Wrong input please add input like that 10 VS5,14 MB11,13 CF';
        } else {
            result = this.resultFormat(this.bakeryItems);
        }

        return result;
    }

    resultFormat(bakeryItems: BakeryItemModel[]) {
        let result = '';
        const bakeryManager = new BakeryManager();
        const bakeryTypesPackages = bakeryManager.getMinimunPackges(bakeryItems);

        bakeryTypesPackages.forEach(bakeryType => {
            if (bakeryType.remain) {
                result += `${bakeryType.quantity} ${bakeryType.type.toUpperCase()} exact match not possible \n`;
            } else {
                result += `${bakeryType.quantity} ${bakeryType.type.toUpperCase()} $${bakeryType.cost.toFixed(2)} \n`;
                bakeryType.packages.forEach(packItem => {
                    result += `   ${packItem.count} * ${packItem.pack} $${packItem.cost.toFixed(2)} \n`;
                });
            }
        });

        return result;
    }
}
