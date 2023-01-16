import {
  getProducts
} from '../js/generique.js';

items();

async function items(){
  const products = await getProducts();
  for (let product of products){
    displayProducts(product);
  }
}

function displayProducts(product) {
  document.getElementById("items").innerHTML +=`
  <a href="product.html?id=${product._id}">
  <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
  </a>`;
};



