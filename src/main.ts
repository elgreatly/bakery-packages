import * as readline from 'readline';
import { BakeryController } from './Controllers/Bakery.controller';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter Input: ', (input) => {
    const bakeryController = new BakeryController();
    const result = bakeryController.getPackges(input);
    console.log(result);
    rl.close();
});
