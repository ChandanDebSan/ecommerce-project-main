import { renderOrderSummary }from '../../scripts/checkout/orderSummary.js'

import { addToCart, cart, loadFromStorage } from '../../data/cart.js'

describe('test Suite :  Render Order Summary', () =>{

  it('display the cart' , ()=>{
    document.querySelector('.js-test-container').innerHTML = ` <div class="checkout-grid">
      <div class="js-order-summary">


      </div>
    </div>`;

    spyOn(localStorage, 'setItem');
    
        spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }]);
        });
        loadFromStorage();

        renderOrderSummary();
  });
});
