import {
  getBasket,
  addBasket
} from '../js/basket.js';

(async function () {
  const productId = getProductId();
  const product = await getProduct(productId);
  hydrateProduct(product)
})()

function getProductId() {
  return new URL(location.href).searchParams.get("id")
}

function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value
    })
    .catch(function (error) {
      alert(error)
    })
}

function hydrateProduct(product) {
  document.getElementsByClassName('item__img')[0].innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
  document.getElementById("title").innerHTML += `${product.name}`;
  document.getElementById("price").innerHTML += `${product.price}`;
  for (let i = 0; i < product.colors.length; i += 1) {
    document.getElementById("colors").innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
  }
}

const elt = document.getElementById('addToCart'); // On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener('click', function () { // On écoute l'événement click
  let productAdd = {
    id: getProductId(),
    color: document.getElementById("colors").value,
    quantity: parseInt(document.getElementById("quantity").value),
  }
  addBasket(productAdd) // On crée un tableau s'il n'existe pas

});

export {
  getProductId
};