import {cart, addToCart , updateCartQuantity} from '../data/cart.js'
import { products } from '../data/products.js'

let productsHTML = ``;
products.forEach((element) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${element.image}" />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${element.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${element.rating.stars * 10}.png" />
            <div class="product-rating-count link-primary">
              ${element.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(element.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${element.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
          <div class="added-to-cart added-to-cart-${element.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary"
        data-product-id="${element.id}">
            Add to Cart
          </button>
        </div>
`;
});


document.querySelector('.show-products').innerHTML = productsHTML;

updateCartIcon();
function updateCartIcon(){
  const cartText = document.querySelector('.js-cart-quantity');
  if(cartText)
    cartText.innerText = updateCartQuantity();
}

document.querySelectorAll('.add-to-cart-button').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;

    addToCart(productId);
    
    updateCartIcon();
  });
});

