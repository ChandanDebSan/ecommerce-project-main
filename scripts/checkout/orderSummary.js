import { cart, changeQuantity, removefromCart, updateCartQuantity, updateDeliveryOption } from '../../data/cart.js'
import { getProduct, products } from '../../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliverOptions, getDeliveryOption } from '../../scripts/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartHtml = ``;

  cart.forEach((cartItem) => {
    
    const matchingItem = getProduct(cartItem.productId);


    cartHtml += `<div class="cart-item-container js-cart-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${updateDeliveryDate(cartItem)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}" />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${matchingItem.id}">
                    Update 
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
               ${deliveryOptionsHTML(matchingItem, cartItem)}
                
                </div>
              </div>
            </div>
          </div>
`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartHtml;
  changeCheckout();

  function updateDeliveryDate(cartItem) {
    const deliverOptionID = cartItem.deliverOptionId;
    const deliverOption =  getDeliveryOption(deliverOptionID);

    const today = dayjs();
    const deliveryDate = today.add(deliverOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd , MMM D');
    return dateString;
  }

  function deliveryOptionsHTML(matchingItem, cartItem) {
    let deliveryHtml = ``;
    deliverOptions.forEach((Option) => {
      const today = dayjs();
      const deliveryDate = today.add(Option.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd , MMM D');

      const priceString = Option.priceCents === 0 ? 'FREE' : `$${(Option.priceCents / 100).toFixed(2)} - `;


      const ischeck = Option.id === cartItem.deliverOptionId;


      deliveryHtml += `
                  <div class="delivery-option js-delivery-option" data-product-id = "${matchingItem.id}"
                  data-delivery-option-id="${Option.id}">
                    <input type="radio" ${ischeck ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}" />
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>
                    `;

    });
    return deliveryHtml;
  }

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removefromCart(productId);
      renderPaymentSummary();
      renderOrderSummary();
      changeCheckout();
    });


  });

  function changeCheckout() {
    const checkoutCount = document.querySelector('.js-checkout-count');
    if (checkoutCount) {
      checkoutCount.innerHTML = `${updateCartQuantity()}`;
      renderPaymentSummary();
    }
  }



  document.querySelector('.order-summary').addEventListener('click', (e) => {

    if (e.target.classList.contains('update-quantity-link')) {
      const productId = e.target.dataset.productId;

      e.target.innerHTML = `
      <input type="number" class="change-quantity-input" min="1" />
      <span class="save-new-quantity link-primary"
            data-product-id="${productId}">
        Save
      </span>
    `;
    }

    if (e.target.classList.contains('save-new-quantity')) {
      const productId = e.target.dataset.productId;

      const container = e.target.closest('.cart-item-container');
      const input = container.querySelector('.change-quantity-input');
      const newQuantity = Number(input.value);

      if (newQuantity <= 0 || isNaN(newQuantity)) {
        alert("Please enter a Value in range from (1-99)");
        return
      };

      changeQuantity(productId, newQuantity);
      renderPaymentSummary();

      container.querySelector('.quantity-label').innerHTML = newQuantity;

      e.target.parentElement.innerHTML = `
      <span class="update-quantity-link link-primary"
            data-product-id="${productId}">
        Update
      </span>
    `;
      changeCheckout();
    }
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      let productId = element.dataset.productId;
      let deliveryOptionId = element.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();