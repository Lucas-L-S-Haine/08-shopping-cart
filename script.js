const baseUrl = 'https://api.mercadolibre.com/sites/MLB';
const productUrl = 'https://api.mercadolibre.com/items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const cartItem = event.target;
  console.log(cartItem);
  cartItem.parentNode.removeChild(cartItem);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getProducts() {
  const response = await fetch(`${baseUrl}/search?q=computador`);
  const product = await response.json();
  return product;
}

// function addProductsToScreen(product) {
//
// }

// const addToCart = () => document.querySelector('.cart').appendChild(this);

const productButton = async (event) => {
  const sku = getSkuFromProductItem(event.target.parentNode);
  const response = await fetch(`${productUrl}/${sku}`);
  const product = await response.json();
  const listItem = createCartItemElement(product);
  document.querySelector('.cart__items').appendChild(listItem);
  // cart.appendChild(listItem);
  localStorage[sku] = JSON.stringify(listItem.innerHTML);
};

function loadShoppingCart() {
  const storageKeys = Object.keys(localStorage);
  const shoppingCart = document.querySelector('ol.cart__items');
  storageKeys.forEach((key) => {
    const itemDescription = JSON.parse(localStorage[key]);
    const item = document.createElement('li');
    item.innerHTML = itemDescription;
    shoppingCart.appendChild(item);
  });
}

function emptyCart() {
  const cart = document.querySelector('.cart__items');
  const size = cart.children.length;
  for (let index = size - 1; index >= 0; index -= 1) cart.removeChild(cart.children[index]);
  localStorage.clear();
}

window.onload = async () => {
  const cleanCartButton = document.querySelector('button.empty-cart');
  cleanCartButton.addEventListener('click', emptyCart);
  loadShoppingCart();
  const products = await getProducts();
  const items = document.querySelector('.items');
  products.results.forEach((product) => {
    const element = createProductItemElement(product);
    items.appendChild(element);
  });
  items.querySelectorAll('button.item__add').forEach((button) => {
    button.addEventListener('click', productButton);
  });
};
