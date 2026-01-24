import { cart, addToCart, updateCartQuantity } from '../data/cart.js'
import { loadProducts, products, Product, Clothing, loadProductsEach } from '../data/products.js'

await loadProductsEach();
searchItem();
renderProductsGrid();

function renderProductsGrid() {
  const url = new URL(window.location.href);
  const searchQuery = url.searchParams.get('search');

  const filterproducts = getFilteredProducts(searchQuery);

  if (filterproducts.length === 0) {
    document.querySelector('.show-products').innerHTML =
      `<div class="no-results">
      <img src="/images/sad-dog.png" class="no-results-img" />
      <h2>No Products Found</h2>
      <p>Try Searching for something else</p>
    </div>`;
    return;
  }


  let productsHTML = ``;
  filterproducts.forEach((element) => {
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
              src="${element.getStarsUrl()}" />
            <div class="product-rating-count link-primary">
              ${element.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${element.getPrice()}
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

           ${element.extraInfoHTML()}


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
  function updateCartIcon() {
    const cartText = document.querySelector('.js-cart-quantity');
    if (cartText)
      cartText.innerText = updateCartQuantity();
  }

  document.querySelectorAll('.add-to-cart-button').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;

      addToCart(productId);

      updateCartIcon();
    });
  });



}

export function searchItem() {

  const form = document.querySelector('.middle-section');
  const input = document.querySelector('.search-bar');
  const button = document.querySelector('.search-button');
  console.log(input.value);
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const searchValue = input.value.trim();
    if (!searchValue) return;
    const encoded = encodeURIComponent(searchValue);

    window.location.href = `index.html?search=${encoded}`
  });

  input.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {
      e.preventDefault();

      const searchValue = input.value.trim();
      if (!searchValue) return;
      const encoded = encodeURIComponent(searchValue);

      window.location.href = `index.html?search=${encoded}`
    }
  });

}

function getFilteredProducts(searchQuery) {
  if (!searchQuery) return products;

  const lowerSearch = searchQuery.toLowerCase();

  return products.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(lowerSearch);

    const keywordMatch = product.keywords?.some(keyword =>
      keyword.toLowerCase().includes(lowerSearch)
    );

    return nameMatch || keywordMatch;
  });

}

