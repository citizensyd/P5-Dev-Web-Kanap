import {
  getBasket,
  changeQuantity,
  removeFromBasket,
  getTotalPrice,
  getNumberProduct
} from '../js/basket.js';

import {
  getProduct
} from '../js/generique.js';

async function getProductId() {
  let productBasket = getBasket();
  let productIdArray = [];
  if (productBasket.length == 0) {
    document.getElementById("cart__items").innerHTML += `Votre panier est vide`
  } else {
    for (let i = 0; i < productBasket.length; i++) {
      productIdArray.push(productBasket[i].id);
    }
  }
  for (let j = 0; j < productIdArray.length; j++) {
    let productId = productIdArray[j];
    let product = await getProduct(productId);
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
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productBasket[j].quantity}">
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
// addEventListener de type change pour observer le changement de la quantité
// la méthode Element.closest() permet de cibler le produit dont il faut changer la quantité grâce à l'identifiant "data-id" et à la couleur "data-color"


async function changeQuantityIn() {
  const el = document.querySelectorAll(".itemQuantity");
  el.forEach((item) => {
    item.addEventListener("change", () => {
      let article = item.closest("article");
      changeQuantity(article.dataset.id, article.dataset.color, item.value);
    });
  });
}
changeQuantityIn();


// Gérer la suppression de produits dans la page Panier 
// la méthode Element.closest() permet de cibler le produit à supprimer grâce à l'identifiant "data-id" et à la couleur "data-color"

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

/* Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un
array de strings product-ID. Les types de ces champs et leur présence doivent être validés
avant l’envoi des données au serveur */

let textRegex = /^[a-zA-ZÀ-ÿ]{2,50}(-| )?([a-zA-ZÀ-ÿ]{2,50})?/;
let addressRegex = /^([0-9a-zA-ZÀ-ÿ\s,.'-]{3,200})$/;
let emailRegex = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;

//fonction de vérification du prénom
function testFirstName() {
  let firstName = document.querySelector("#firstName");
  firstName.addEventListener("change", () => {
    if (textRegex.test(firstName.value)) {
      firstNameErrorMsg.innerText = '';
    } else {
      firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom sans chiffre ni caractère spéciaux entre 2 et 50 caractères.';
    }
  });
  return firstName.value
}
testFirstName()

//Fonction pour afficher le total d'article dans le panier
function getTotalArticle() {
  let totalArticle = getNumberProduct();
  document.getElementById("totalQuantity").innerHTML += `${totalArticle}`;
}
getTotalArticle()

//Fonction pour afficher le total des prix des articles dans le panier
async function getTotalPriceCart() {
  let totalPrice = await getTotalPrice();
  document.getElementById("totalPrice").innerHTML += `${totalPrice}`;

}
getTotalPriceCart()

//fonction vérification du nom
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

//fonction vérification de l'adresse
function testAdress() {
  let address = document.querySelector("#address");
  address.addEventListener("keypress", () => {
    if (addressRegex.test(address.value)) {
      console.log(addressRegex.test(address.value));
      addressErrorMsg.innerText = '';
    } else {
      addressErrorMsg.innerText = 'Veuillez indiquer une adresse entre 3 et 200 caractères.';
    }
  });
}
testAdress()

//fonction vérification de la ville
function testCity() {
  let city = document.querySelector("#city");
  city.addEventListener("change", () => {
    if (addressRegex.test(city.value)) {
      cityErrorMsg.innerText = '';
    } else {
      cityErrorMsg.innerText = 'Veuillez indiquer une ville entre 3 et 200 caractères.';
    }
  });
}
testCity()

//fonction de vérification de l'email
function testEmail() {
  let email = document.querySelector("#email");
  email.addEventListener("keypress", () => {
    if (emailRegex.test(email.value)) {
      emailErrorMsg.innerText = '';
    } else {
      emailErrorMsg.innerText = 'Veuillez indiquer une adresse mail de ce type ee...z@ez..ez.com.';
    }
  });
}
testEmail()

// Création d'un objet contenant les données remplies du formulaire par l'utilisateur
async function putObject() {
  const order = document.getElementById('order');
  console.log(order);
  order.addEventListener('click', async (event) => {
    event.preventDefault();
        console.log(firstName.value)
        let contact = {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        };
        console.log(contact)
        let basket = getBasket();
        console.log(basket[0].id)
        let productsId = [];
        for (let i = 0; i < basket.length; i++) {
          productsId.push(basket[i].id)
        }
        let sendData = {
          contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: productsId
      };
      console.log(sendData)
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
      })
    }
      putObject();