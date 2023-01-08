import {
  getBasket,
} from '../js/basket.js';

import {
  getProduct
} from '../js/generique.js';

let basket = getBasket();
if (basket.length == 0){
  document.getElementById("cart__items").innerHTML += `Votre panier est vide`
}
else {
(async function () {
  const productId = getProductId();
  const product = await getProduct(productId);
  hydrateProductCart(product)
})()
}

function getProductId() {
  let productInArray = getBasket();
  for (let i = 0; i < productInArray.length; i++) {
    return productInArray[i].id
  }  
}

function hydrateProductCart(product) {
  let productInArray2 = getBasket();
  for (let i = 0; i < productInArray2.length; i++) {
    document.getElementById("cart__items").innerHTML += `
<article class="cart__item" data-id="${productInArray2[i].id}" data-color="${productInArray2[i].color}">
<div class="cart__item__img">
  <img src=${product.imageUrl} alt=${product.altTxt}>
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>${productInArray2[i].color}</p>
    <p>${product.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : ${productInArray2[i].quantity}</p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInArray2[i].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>
    `
  }

}