import {
  getBasket,
  addBasket
} from '../js/basket.js';

(async function () {
  const productId = getProductId()
  console.log(productId)
  const product = await getProduct(productId)
  console.log(product)
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
  document.getElementsByClassName('item__img')[0].innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`
  document.getElementById("title").innerHTML += `${product.name}`
  document.getElementById("price").innerHTML += `${product.price}`
  document.getElementById("colors").innerHTML += `
    <option value="vert">vert</option>
    <option value="blanc">blanc</option>`
}

const elt = document.getElementById('addToCart'); // On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener('click', function (event) { // On écoute l'événement click
  event.addBasket(); // On crée un tableau s'il n'existe pas

});

export {
  getProductId
};