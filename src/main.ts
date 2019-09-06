import * as readline from 'readline';
import { BakeryController } from './Controllers/Bakery.controller';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter Input: ', (input) => {
    // console.log(answer.toLowerCase());
    let bakeryController = new BakeryController();
    let result = bakeryController.getPackges(input);
    console.log(result);
    rl.close();
});