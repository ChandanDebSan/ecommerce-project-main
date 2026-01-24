import { orderDB, Order } from '../scripts/order.js'
import { getProduct, loadProductsEach } from '../data/products.js'
import { getArrivalDate } from '../scripts/order.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { getDeliveryOption } from '../../scripts/deliveryOptions.js'

export function displayTracking(orderId, productId) {
  const order = orderDB.find(o => o.orderId === orderId);
  const item = order.orderArr.find(o => o.productId === productId);
  let displayHtml = ``;

  let matchingItem = getProduct(productId);

  displayHtml += `<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${getArrivalDate(item.deliverOptionId, order.placedDate)}
        </div>

        <div class="product-info">
          ${matchingItem.name}
        </div>

        <div class="product-info">
          Quantity: ${item.quantity}
        </div>

        <img class="product-image" src="${matchingItem.image}" />

        <div class="progress-labels-container">
          <div class="progress-label js-progress-preparing">
            Preparing
          </div>
          <div class="progress-label js-progress-shipped">
            Shipped
          </div>
          <div class="progress-label js-progress-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`;


  document.querySelector('.js-tracking-display').innerHTML = displayHtml;
  setProgressbar(order , item);
}


function setProgressbar(order , item) {
  const progress = document.querySelector('.progress-bar');
  const now = dayjs(); 
  
  const placed = dayjs(order.placedDate);

  const option = getDeliveryOption(item.deliverOptionId);
  const totalDays = option.deliveryDays;

  const totalDuration = dayjs(placed).add(totalDays, 'day').diff(placed);

  const elapsed = now.diff(placed);

  let progressPercent = (elapsed / totalDuration) * 100;
  if (progressPercent > 0 && progressPercent < 49) {
    progressPercent = 10;
    document.querySelector('.js-progress-preparing').classList.add('current-status');

  }
  else if (progressPercent > 50 && progressPercent < 99) {
    //progressPercent = 50;
    document.querySelector('.js-progress-preparing').classList.remove('current-status');
    document.querySelector('.js-progress-shipped').classList.add('current-status');
  }
  else {
    //progressPercent = 100;
    document.querySelector('.js-progress-shipped').classList.remove('current-status');
    document.querySelector('.js-progress-delivered').classList.add('current-status');
  }
  progress.style = `Width : ${progressPercent}%`;

}

const parm = new URLSearchParams(window.location.search);
const orderId = parm.get('orderId');
const productId = parm.get('productId');
await loadProductsEach();
displayTracking(orderId, productId);


