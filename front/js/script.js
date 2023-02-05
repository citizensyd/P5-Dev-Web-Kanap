//Importation de fonction d'un autre fichier js
import {
  getProducts
} from '../js/generique.js';

// Récupérer les articles un par un et les envoyer à la fonction d'affichage
async function items() {
  const products = await getProducts();
  for (let product of products) {
    displayProducts(product);
  }
}
items();

// Insérer le code HTML d'affichage de chaque produit dans le DOM
function displayProducts(product) {
  document.getElementById("items").innerHTML += `
  <a href="product.html?id=${product._id}">
  <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
  </a>`;
}