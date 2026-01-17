import { addToCart, cart, loadFromStorage } from '../../data/cart.js'

describe('test suite: addToCart', () => {
  beforeEach(() => {
    let testRoot = document.getElementById('test-root');

  if (!testRoot) {
    testRoot = document.createElement('div');
    testRoot.id = 'test-root';
    document.body.appendChild(testRoot);
  }

  testRoot.innerHTML = `
    <div class="added-to-cart-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"></div>
    <select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
      <option value="1" selected>1</option>
    </select>
  `;
  
  });
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart' , '[]');
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});

