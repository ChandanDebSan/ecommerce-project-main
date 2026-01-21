import {renderOrderSummary} from './checkout/orderSummary.js'

import {renderPaymentSummary} from './checkout/paymentSummary.js'

import {loadProducts} from '../data/products.js' 

loadFromStorage();
loadProducts(renderOrderSummary);
loadProducts(renderPaymentSummary);


import {Car, RaceCar} from '../data/car.js'
import { loadFromStorage } from '../data/cart.js';

const carA = new RaceCar('McLaren' , 'F1' , 20);
carA.displayinfo();
for(let i = 0; i <100; i++) carA.go();
carA.displayinfo();