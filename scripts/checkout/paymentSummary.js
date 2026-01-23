
import { cart, loadFromStorage, updateCartQuantity } from '../../data/cart.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../scripts/deliveryOptions.js'
import { Order, orderDB, OrderItems } from '../../scripts/order.js'
import { convertCents } from '../../scripts/money.js'
export function renderPaymentSummary() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliverOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;

  const paymentSummaryHtml = `<div class="payment-summary-title">
        Payment Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${updateCartQuantity()}):</div>
        <div class="payment-summary-money">$${convertCents(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${convertCents(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${convertCents(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${convertCents(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${convertCents(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    </div>`;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

  document.querySelector('.place-order-button').addEventListener('click', () => {
    const storedOrders = JSON.parse(localStorage.getItem('orderDB')) || [];

    const ordercontainer = new OrderItems();
    cart.forEach(item => {
      ordercontainer.addOrder(new Order(item));
    });

    storedOrders.push(ordercontainer);

    localStorage.setItem('orderDB', JSON.stringify(storedOrders));
  });

}

export function calculateTotal(cart) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliverOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;
  return totalCents;
}

