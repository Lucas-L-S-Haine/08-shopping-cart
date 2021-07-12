const baseUrl = 'https://api.mercadolibre.com/sites/MLB/';
const productUrl = 'https://api.mercadolibre.com/items/';

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

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');

  button.addEventListener('click',async (event) => {

    const response = await fetch(`${productUrl}/${sku}`);
    const product = await response.json();
    console.table(Object.entries(product));
    const listItem = createCartItemElement(product);
    document.querySelector('.cart__items').appendChild(listItem);
    // event.target.parentElement;
  });

  section.appendChild(button);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
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

const addToCart = () => document.querySelector('.cart').appendChild(this);

window.onload = async () => {
  const products = await getProducts();
  // console.log(products.results);
  const items = document.querySelector('.items');
  products.results.forEach((product) => {
    const element = createProductItemElement(product);
    // const addButton = document.createElement('button');
    // element.children[3].innerHTML = addButton;
    items.appendChild(element);
    // console.log(element.children[3].innerText);
  });
};
