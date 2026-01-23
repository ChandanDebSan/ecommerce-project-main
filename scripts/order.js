import { getProduct, Product, loadProducts, loadProductsEach } from '../data/products.js'
import { convertCents } from '../scripts/money.js'
import { calculateTotal } from './checkout/paymentSummary.js';
import { getDeliveryOption } from '../../scripts/deliveryOptions.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { addToCart, cart, changeCheckout, saveCart } from '../data/cart.js';

function getArrivalDate(deliveryOption, placedDate) {
  const deliver = getDeliveryOption(deliveryOption);
  const days = deliver.deliveryDays;
  return dayjs(placedDate)
    .add(days, 'day')
    .format('MMMM D');
}

export class Order {
  productId;
  quantity;
  deliverOptionId;
  constructor(cart) {
    this.productId = cart.productId;
    this.quantity = cart.quantity;
    this.deliverOptionId = cart.deliverOptionId;
  }
  buyAgain() {
    const addedText = document.querySelector(`.js-buy-again-button-${this.productId}`);
    let matchingItem;
    clearTimeout(addedText.timeoutId);
    addedText.classList.add('show-added-msg');
    addedText.timeoutId = setTimeout(() => {
      addedText.classList.remove('show-added-msg');
    }, 1000);

    cart.forEach((item) => {
      if (this.productId === item.productId) {
        matchingItem = item;
      }
    });

    let selecQuantity = this.quantity;

    if (matchingItem) {
      matchingItem.quantity += selecQuantity;


    } else {
      cart.push({
        productId: this.productId,
        quantity: selecQuantity,
        deliverOptionId: '1'
      });

    }
    saveCart();
  
  }

}

export class OrderItems {
  orderArr;
  orderId;
  placedDate;
  constructor() {
    this.orderArr = [];
    this.orderId = crypto.randomUUID();
    this.placedDate = dayjs().format();
  }
  addOrder(order) {
    let id = order.productId;
    const index = this.orderArr.findIndex(e => e.productId === id);
    if (index === -1) this.orderArr.push(order);
  }
  removeOrder(order) {
    let id = order.productId;
    const index = this.orderArr.findIndex(e => e.productId === id);
    if (index === -1) return;
    this.orderArr.splice(index, 1);
  }

  displayOrders() {
    let displayHtml = ``;
    this.orderArr.forEach((orderelement) => {
      let matching = getProduct(orderelement.productId);

      displayHtml += `
            <div class="product-image-container">
              <img src="${matching.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matching.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${getArrivalDate(orderelement.deliverOptionId, this.placedDate)}
              </div>
              <div class="product-quantity">
                Quantity: ${orderelement.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button-${orderelement.productId}" 
              data-product-id="${orderelement.productId}"
              data-order-id="${this.orderId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy It Again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `;
    });
    return displayHtml;
  }

  calculateTotal() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    this.orderArr.forEach((orderItem) => {
      const product = getProduct(orderItem.productId);
      if (!product) {
        console.error('Product not found:', orderItem.productId);
        return;
      }

      productPriceCents += product.priceCents * orderItem.quantity;

      const deliveryOption = getDeliveryOption(orderItem.deliverOptionId);
      if (!deliveryOption) {
        console.error('Delivery option not found:', orderItem.deliverOptionId);
        return;
      }

      shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;

    return totalBeforeTax + taxCents;
  }
}

const rawOrders = JSON.parse(localStorage.getItem('orderDB')) || [];

export const orderDB = rawOrders.map(orderData => {
  const orderItems = new OrderItems();
  orderItems.orderId = orderData.orderId;
  orderItems.placedDate = orderData.placedDate;

  orderItems.orderArr = orderData.orderArr.map(item => new Order(item));

  return orderItems;
});

export function renderOrderPage() {
  let displayHtml = ``;
  orderDB.forEach((order) => {
    displayHtml += `<div class="order-header">
    <div class="order-container">

    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${dayjs(order.placedDate).format('MMMM D')}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${convertCents(order.calculateTotal())}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.orderId}</div>
      </div>
    </div>

    <div class="order-details-grid">
      ${order.displayOrders()}
    </div>

  </div>
  </div>`;
  }

  );

  document.querySelector('.js-order-container').innerHTML = displayHtml;
  document.querySelectorAll('.buy-again-button').forEach((button) => {
    button.addEventListener('click' , () => {
      const productId = button.dataset.productId;
      const orderId = button.dataset.orderId;
      const order = orderDB.find(o => o.orderId === orderId);
      const item = order.orderArr.find(o => o.productId === productId);
      if(item) item.buyAgain();
      changeCheckout();
      renderOrderPage();
    });
  });

}

