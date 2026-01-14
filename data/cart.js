
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
  const addedText = document.querySelector(`.added-to-cart-${productId}`);

  let matchingItem;
  clearTimeout(addedText.timeoutId);
  addedText.classList.add('show-added-msg');
  addedText.timeoutId = setTimeout(() => {
    addedText.classList.remove('show-added-msg');
  }, 1000);

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  let selecQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  if (matchingItem) {
    matchingItem.quantity += selecQuantity;


  } else {
    cart.push({
      productId: productId,
      quantity: selecQuantity
    });

  }
  localStorage.setItem('cart' , JSON.stringify(cart));
  
}

export function removefromCart(productId){
  const newCart = [];
  cart.forEach((item) => {
    if(item.productId !== productId) newCart.push(item);
  });
  cart = newCart;
  localStorage.setItem('cart' , JSON.stringify(cart));
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => { cartQuantity += item.quantity });
  return cartQuantity;
}

export function changeQuantity(productId , quantity){
  let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId) matchingItem = cartItem;
  });

  if(!matchingItem) return;
  matchingItem.quantity = quantity;
  localStorage.setItem('cart' , JSON.stringify(cart));
}