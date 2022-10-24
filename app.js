const body = document.querySelector('body');
const navList = document.querySelector('#nav-list');
const slider = document.querySelector('#slider');
const features = document.querySelector('#features');
const product = document.querySelector('#product');
const paymentBlock = document.querySelector('#paymentBlock');
const productButton = document.querySelector('#productButton');
const upButton = document.querySelector('#upButton');
const paymentForm = document.querySelector('#paymentForm');
const formCancel = document.querySelector('#formCancel');
const successMessage = document.querySelector('#successMessage');

let isVisiblePayment = false;

const showSuccessMessage = () => {
  successMessage.classList.remove('hidden');

  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 4000)
}

upButton.addEventListener('click', () => {
  window.scrollTo(0, 0);
})

const setIsVisiblePayment = () => {
  isVisiblePayment = !isVisiblePayment;
}

productButton.addEventListener('click', () => {
  setIsVisiblePayment();
  body.style.overflow = 'hidden';
  paymentBlock.classList.remove('hidden');
  paymentBlock.classList.add('flex');
})

const closePaymentForm = () => {
  paymentBlock.classList.add('hidden');
  body.style.overflow = 'auto';
  paymentForm.reset();
}

formCancel.addEventListener('click', () => {
  closePaymentForm();
})

paymentBlock.addEventListener('click', (event) => {
  setIsVisiblePayment();

  if(event.target.classList.contains('payment')) {
    closePaymentForm();
  }
})

const onSubmit = (e) => {
  e.preventDefault();
  
  closePaymentForm();
  showSuccessMessage()
  paymentForm.reset();
}

paymentForm.addEventListener('submit', onSubmit);

const colors = [
  'bg-green-700', 
  'bg-orange-700', 
  'bg-indigo-700', 
  'bg-fuchsia-700', 
  'bg-red-700'
];

const createClass = (color) => {
  switch(color) {
    case 'green':
      return 'bg-green-700'
    case 'blue':
      return 'bg-blue-700'
    case 'gray':
      return 'bg-gray-700'
    case 'lightgray':
      return 'bg-gray-400'
    case 'white':
      return 'bg-white'
    default:
      return 'bg-black'
  }
}

const state = {
  products: [],
  features: [],
  product: {
    index: 0,
    imageIndex: 0,
    size: 0,
  }
}

function fetchData(url) {
  return fetch(`./src/data/${url}.json`)
    .then(res => res.json())
    .then((data) => {
      state[url] = state[url].concat(data);
    })
    .catch((err) => {
      throw new Error(err);
    })
}

function slideItem(i) {
  state.product.index = i;
  state.product.imageIndex = 0;
  state.product.size = 0;

  slider.style.transform = `translateX(${-i * 100}vw)`;
  renderProductCard();
}

const renderList = (products) => {
  navList.innerHTML = `
    ${products.map((product, i) => (
      `<li>
        <button type="button" class="nav-list-button" onclick="slideItem(${i})">
          ${product.name}
        </button>
      </li>`
    )).join('')}
  `;
}

const renderSliderItems = (products) => {
  slider.innerHTML = `
  ${products.map((product, i) => (
    `<div class="slider-item container">
      <img src=${product.images[0].src} alt=${product.name} class="slider-item-image">
      <span class="slider-item-bg ${colors[i]}">Slider Background</span>
      <h2 class="slider-item-title">${product.name}<br/>new<br/>season</h2>
      <h3 class="slider-item-price">${product.price}</h3>
      <a href="#product" class="slider-button">Buy now</a>
    </div>`
  )).join('')}
  `
}

const renderFeatures = (featuresList) => {
  features.innerHTML = `${
    featuresList.map((feature) => (
      `<div class="flex flex-col items-center w-[100%] bmd:w-1/2 md:w-1/4">
        <img class="w-14 h-14" src="${feature.image}" />
        <h3 class="uppercase font-semibold my-3">${feature.title}</h3>
        <p class="w-2/3 text-center text-gray-500">${feature.text}</p>
      </div>`
    )).join('')
  }`
}

const changeProductImage = (i) => {
  state.product.imageIndex = i;
  renderProductCard();
}

const changeProductSize = (size) => {
  state.product.size = +size;
  renderProductCard();
}

const renderProductCard = () => {
  const { index, imageIndex, size: selectedSize } = state.product; 
  const { images, name, price, description, sizes } = state.products[index];

  const productImage = product.querySelector('#productImage');
  const productTitle = product.querySelector('#productTitle');
  const productDescription = product.querySelector('#productDescription');
  const productPrice = product.querySelector('#productPrice');
  const productSizes = product.querySelector('#productSizes');
  const productColors = product.querySelector('#productColors');

  productImage.src = images[imageIndex].src;
  productTitle.textContent = name;
  productDescription.textContent = description;
  productPrice.textContent = price;

  productSizes.innerHTML = `
    ${sizes.map((size) => (`
      <button class="py-1 px-4 ${selectedSize === +size ? 'bg-black text-white' : 'bg-white text-black'} border border-black font-semibold hover:bg-black hover:text-white transition-all duration-300" onclick="changeProductSize(${size})">${size}</button>
    `)).join('')}
  `;

  productColors.innerHTML = `
  ${images.map((img, i) => (`
      <button class="w-8 h-8 text-[0] ${createClass(img.title)} border rounded-lg duration-300 transition-transform hover:-translate-y-0.5 ${imageIndex === i && 'border-4 border-gray-800'}" onclick="changeProductImage(${i})">Change color</button>
    `)).join('')}
  `;
}

const render = async () => {
  await fetchData('products');
  await fetchData('features');

  slider.classList.add(`w-[${state.products.length * 100}vw]`);

  renderList(state.products);
  renderSliderItems(state.products);
  renderFeatures(state.features);
  renderProductCard(0, 0);
}

render();

