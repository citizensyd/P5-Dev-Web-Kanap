


import {
  getBasket,
  addBasket
} from '../js/basket.js';












  for (let i = 0; i < product.colors.length; i += 1) {
    document.getElementById("cart__items").innerHTML +=`
// boucle qui va chercher les éléments dans le tableau
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src=${} alt=${}>
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${}</h2>
    <p>${}</p>
    <p>${}</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : ${}</p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>
    `
  }




