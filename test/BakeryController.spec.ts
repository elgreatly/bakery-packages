import { expect } from 'chai';
import 'mocha';
import { BakeryController } from '../src/Controllers/Bakery.controller';

describe('Bakery Controller', () => {
    it('should return error if enter wrong input', () => {
        const bakeryController = new BakeryController();
        const result = bakeryController.getPackges('vs5');
        expect(result).to.equal('Wrong input please add input like that 10 VS5,14 MB11,13 CF');
    });

    it('should return correct result if enter correct input', () => {
        const bakeryController = new BakeryController();
        const result = bakeryController.getPackges('10 vs5');
        expect(result).to.contains(`10 VS5 $17.98`);
    });

});
