// Importation de fonction d'autres fichiers js
import {
  getBasket,
  changeQuantity,
  removeFromBasket,
  getTotalPrice,
  getNumberProduct
} from '../js/basket.js';

import {
  getProduct,
  alertMoreThanHundredProduct
} from '../js/generique.js';

// Affichage des produits du panier
// Récupèrer les identifiants des produits du panier
async function getProductId() {
  let productBasket = getBasket();
  //Trier le panier pour regrouper les identifiants identiques
  productBasket.sort(function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });
  // Déclaration de la variable du tableau qui contiendra les identifiants
  let productIdArray = [];
  // Condition pour l'incorporation un texte pour indiquer que le panier est vide
  if (productBasket.length == 0) {
    document.getElementById("cart__items").innerHTML += `Votre panier est vide`
  } else { // Boucle for pour remplir le tableau avec les identifiants 
    for (let i = 0; i < productBasket.length; i++) {
      productIdArray.push(productBasket[i].id);
    }
  } // Boucle for pour afficher chaque produit dans la page panier
  for (let j = 0; j < productIdArray.length; j++) {
    // Récupére chaque identifiant contenu dans le tableau
    let productId = productIdArray[j];
    // Récupére le produit
    let product = await getProduct(productId);
    // Insère le produit dans la page panier
    document.getElementById("cart__items").innerHTML += `
    <article class="cart__item" data-id="${product._id}" data-color="${productBasket[j].color}">
    <div class="cart__item__img">
    <img src=${product.imageUrl} alt=${product.altTxt}>
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${productBasket[j].color}</p>
      <p>${product.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${productBasket[j].quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${productBasket[j].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
    </div>
    </article>
      `;
  }
}
await getProductId();

// Gérer la modification de produits dans la page Panier
async function changeQuantityIn() {
  const el = document.querySelectorAll(".itemQuantity");
  el.forEach((item) => {
    item.addEventListener("change", () => {
      let article = item.closest("article");
      article = {
        id: article.dataset.id,
        color: article.dataset.color,
        quantity: item.value
      }
      alertMoreThanHundredProduct(article);
      changeQuantity(article);
    });
  });
}
changeQuantityIn();

// Gérer la suppression de produits dans la page Panier 
async function removeElement() {
  const el = document.querySelectorAll(".deleteItem");
  el.forEach((item) => {
    item.addEventListener("click", () => {
      let article = item.closest("article");
      removeFromBasket(article.dataset.id, article.dataset.color);
      location.reload();
    });
  });
}
removeElement();

// Afficher le total d'article dans le panier
function getTotalArticle() {
  let totalArticle = getNumberProduct();
  document.getElementById("totalQuantity").innerHTML += `${totalArticle}`;
}
getTotalArticle()

// Afficher le total des prix des articles dans le panier
async function getTotalPriceCart() {
  let totalPrice = await getTotalPrice();
  document.getElementById("totalPrice").innerHTML += `${totalPrice}`;
}
getTotalPriceCart()

// Regex pour filtrer les caractères autorisés dans les cases du formulaire
const textRegex = /^[a-zA-ZÀ-ÿ]{1,50}(-| )?([a-zA-ZÀ-ÿ]{1,50})$/;
const addressRegex = /^([0-9a-zA-ZÀ-ÿ\s,.'-]{3,200})$/;
const cityRegex = /^([a-zA-ZÀ-ÿ\s'-]{3,200})$/;
const emailRegex = /^[\.\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

let firstName = document.querySelector("#firstName");

// Vérification du prénom
function testFirstName() {
  firstName.addEventListener("change", () => {
    if (textRegex.test(firstName.value)) {
      firstNameErrorMsg.innerText = '';
    } else {
      firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom sans chiffre ni caractère spéciaux entre 2 et 50 caractères.';
    }
  });
}
testFirstName()


// Vérification du nom
function testLastName() {
  let lastName = document.querySelector("#lastName");
  lastName.addEventListener("change", () => {
    if (textRegex.test(lastName.value)) {
      lastNameErrorMsg.innerText = '';
    } else {
      lastNameErrorMsg.innerText = 'Veuillez indiquer une nom sans chiffre ni caractère spéciaux entre 2 et 50 caractères.';
    }
  });
}
testLastName()

// Vérification de l'adresse
function testAdress() {
  let address = document.querySelector("#address");
  address.addEventListener("change", () => {
    if (addressRegex.test(address.value)) {
      console.log(addressRegex.test(address.value));
      addressErrorMsg.innerText = '';
    } else {
      addressErrorMsg.innerText = 'Veuillez indiquer une adresse entre 3 et 200 caractères sans caractère spéciaux.';
    }
  });
}
testAdress()

// Vérification de la ville
function testCity() {
  let city = document.querySelector("#city");
  city.addEventListener("change", () => {
    if (cityRegex.test(city.value)) {
      cityErrorMsg.innerText = '';
    } else {
      cityErrorMsg.innerText = 'Veuillez indiquer une ville entre 3 et 200 caractères sans caractère spéciaux.';
    }
  });
}
testCity()

// Vérification de l'email
function testEmail() {
  let email = document.querySelector("#email");
  email.addEventListener("change", () => {
    if (emailRegex.test(email.value)) {
      emailErrorMsg.innerText = '';
    } else {
      emailErrorMsg.innerText = 'Veuillez indiquer une adresse mail de ce type ee...z@ez..ez.com contenant uniquement des chiffres et des lettres.';
    }
  });
}
testEmail()

// Vérification du remplissage de chaque case du formulaire et de leur type.
function validateForm() {
  // Prénom
  if (firstName.value === "") {
    firstNameErrorMsg.innerText = 'Veuillez remplir un prénom.';
    return false;
  } else if (typeof (firstName.value) == !"string") {
    firstNameErrorMsg.innerText = 'Veuillez remplir un prénom ne contenant que des caractères valide.';
    return false;
  }
  // Prénom
  else if (lastName.value === "") {
    lastNameErrorMsg.innerText = 'Veuillez remplir un nom.';
    return false;
  } else if (typeof (lastName.value) == !"string") {
    lastNameErrorMsg.innerText = 'Veuillez remplir un nom ne contenant que des caractères valide.';
    return false;
  }
  // Adresse
  else if (address.value === "") {
    addressErrorMsg.innerText = 'Veuillez remplir une adresse.';
    return false;
  } else if (typeof (address.value) == !"string") {
    addressErrorMsg.innerText = 'Veuillez remplir une adresse ne contenant que des caractères valide.';
    return false;
  }
  // Ville
  else if (city.value === "") {
    cityErrorMsg.innerText = 'Veuillez remplir une ville.';
    return false;
  } else if (typeof (city.value) == !"string") {
    cityErrorMsg.innerText = 'Veuillez remplir une ville ne contenant que des caractères valide.';
    return false;
  }
  // Email
  else if (email.value === "") {
    emailErrorMsg.innerText = 'Veuillez remplir une email.';
    return false;
  } else if (typeof (email.value) == !"string") {
    emailErrorMsg.innerText = 'Veuillez remplir une email ne contenant que des caractères valide.';
    return false;
  }
  return true
}

// Création d'un objet contenant les données remplies du formulaire par l'utilisateur
async function putObject() {
  const order = document.getElementById('order');
  console.log(order);
  order.addEventListener('click', async (event) => {
    event.preventDefault();
    let basket = getBasket();
    if (validateForm() && basket != undefined && basket.length != 0) {
      let productsId = [];
      for (let i = 0; i < basket.length; i++) {
        productsId.push(basket[i].id);
      }
      let sendData = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value
        },
        products: productsId
      };
      const response = await fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const result = await response.json();
      window.location.href = "./confirmation.html?orderId=" + result.orderId;
      localStorage.clear();
    } else {

    }

  });
}
putObject();