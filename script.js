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
  console.log(event.target.parentNode);
  console.log(sku);
  const response = await fetch(`${productUrl}/${sku}`);
  const product = await response.json();
  // console.table(Object.entries(product));
  const listItem = createCartItemElement(product);
  document.querySelector('.cart__items').appendChild(listItem);
};

window.onload = async () => {
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
