// Importation de fonction d'autres fichiers js
import {
  addBasket
} from '../js/basket.js';

import {
  getProduct,
  alertMoreThanHundredProduct
} from '../js/generique.js';

// Récupérer l'identifiant de l'article sur la page du produit
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

// Récupérer le produit dans l'api selon son identifiant
(async function () {
  const productId = getProductId();
  const product = await getProduct(productId);
  hydrateProduct(product);
  addToCart(product);
})();

//Ajouter les éléments d'un article dans la page HTML
function hydrateProduct(product) {
  document.getElementsByClassName('item__img')[0].innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
  document.getElementById("title").innerHTML += `${product.name}`;
  document.getElementById("price").innerHTML += `${product.price}`;
  document.getElementById("description").innerHTML += `${product.description}`;
  for (let i = 0; i < product.colors.length; i += 1) {
    document.getElementById("colors").innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
}

// Ajouter un produit au panier
function addToCart(product) {
  const elt = document.getElementById('addToCart'); // On récupère l'élément sur lequel on veut détecter le clic
  elt.addEventListener('click', function () { // On écoute l'événement click
    let productAdd = {
      id: getProductId(),
      color: document.getElementById("colors").value,
      quantity: parseInt(document.getElementById("quantity").value)
    };
    if (productAdd.color == "") {
      alert("Vous avez oublié de choisir la couleur de l'article !");
    } else if (productAdd.quantity == 0) {
      alert("Vous avez oublié de choisir la quantité d'article !");
    } else {
      let quantity = parseInt(document.getElementById("quantity").value);
      if (productAdd.quantity >= 100) {
        alertMoreThanHundredProduct(productAdd);
      } else {
        const msg = `Vous venez d'ajouter ${quantity} ${product.name} dans le panier`
        alert(msg);
      }
      addBasket(productAdd);
    }
  });
}