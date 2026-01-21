import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js'
import {loadProducts} from '../data/products.js' 
import { addToCart, cart, loadFromStorage } from '../../data/cart.js'

describe('test Suite :  Render Order Summary', () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = ` <div class="checkout-grid">
      <div class="js-order-summary">
      </div>
    </div>
    <div class="js-payment-summary"></div>`;

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
  });

  it('display the cart', () => {
    loadFromStorage();
    loadProducts(renderOrderSummary);
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('Removes a product', () => {
    loadFromStorage();
    loadProducts(renderOrderSummary);
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(cart.length).toEqual(1);
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-${productId1}`)).toBeNull();
    expect(document.querySelector(`.js-cart-${productId2}`)).not.toBeNull();
    document.querySelector('.js-test-container').innerHTML = ``;
  });

  });