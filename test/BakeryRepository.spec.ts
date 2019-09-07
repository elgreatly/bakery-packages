import { expect } from 'chai';
import 'mocha';
import { BakeryRepository } from '../src/Repository/Bakery.repository';

describe('Bakery Repository', () => {
    it('should return right packages for specific code', () => {
        const bakeryRepo = new BakeryRepository();
        const result = bakeryRepo.getAvailablePackages('vs5');
        expect(result[0].quantity).to.equal(5);
        expect(result[1].quantity).to.equal(3);
    });

    it('should return undefined if the type not exist', () => {
        const bakeryRepo = new BakeryRepository();
        const result = bakeryRepo.getAvailablePackages('mb');
        expect(result).to.equal(undefined);
    });

});
