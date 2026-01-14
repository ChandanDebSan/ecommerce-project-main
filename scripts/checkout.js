import { cart, changeQuantity, removefromCart, updateCartQuantity } from '../data/cart.js'
import { products } from '../data/products.js'

let cartHtml = ``;
cart.forEach((cartItem) => {
  const matchingItem = products.find((product) => {
    return product.id === cartItem.productId;
  });

  if (!matchingItem) return;
  cartHtml += `<div class="cart-item-container js-cart-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}" />
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}" />
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}" />
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;
});

document.querySelector('.order-summary').innerHTML = cartHtml;
changeCheckout();
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removefromCart(productId);
    document.querySelector(`.js-cart-${productId}`).remove();
    changeCheckout();
  });


});

function changeCheckout(){
  const checkoutCount = document.querySelector('.js-checkout-count');
  if (checkoutCount) {
    checkoutCount.innerHTML = `${updateCartQuantity()}`;
  }
}



document.querySelector('.order-summary').addEventListener('click' , (e) =>{
    
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

  if(e.target.classList.contains('save-new-quantity')){
    const productId = e.target.dataset.productId;

    const container = e.target.closest('.cart-item-container');
    const input = container.querySelector('.change-quantity-input');
    const newQuantity = Number(input.value);

    if(newQuantity <= 0 || isNaN(newQuantity)){ 
      alert("Please enter a Value in range from (1-99)");  
      return
    };

    changeQuantity(productId , newQuantity);
    
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