//Importation de fonction d'un autre fichier js
import {
    getProduct
} from "../js/generique.js"

// Sauvegarde du panier
function saveBasket(basket) {
    let basketString = JSON.stringify(basket);
    localStorage.setItem("basket", basketString);
}

// Récupération du panier
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return basket = [];
    } else {
        return JSON.parse(basket)
    }
}

// Ajout d'un produit au panier
function addBasket(productAdd) {
    let basket = getBasket();
    let result;
    console.log(basket);
    let foundProduct = basket.filter(p => p.id == productAdd.id && p.color == productAdd.color);
    if (foundProduct.length != 0) {
        let result = foundProduct[0].quantity += productAdd.quantity;
        saveBasket(basket);
        if (result > 100) {
            foundProduct[0].quantity = 100;
            saveBasket(basket);
        }
    } else {
        basket.push(productAdd);
        saveBasket(basket);
    };
};


// Suppression d'un article dans le panier
function removeFromBasket(productId, productColor) {
    let basket = getBasket();
    basket = basket.filter((item) => !(item.id == productId && item.color == productColor));
    console.log(basket);
    saveBasket(basket);
}

// Changement de la quantité d'un produit sur la page panier et dans le local storage
function changeQuantity(product) {
    let basket = getBasket();
    console.log(basket);
    let foundProduct = basket.find((item) => (item.id == product.id && item.color == product.color));
    if (product.quantity <= 0) {
        removeFromBasket(foundProduct.id, foundProduct.color);
        location.reload();
    } else if (product.quantity > 100) {
        product.quantity = 100;
        saveBasket(basket);
        location.reload();
    } else if (foundProduct != undefined) {
        foundProduct.quantity = product.quantity;
        saveBasket(basket);
        location.reload();
    } else {
        saveBasket(basket);
        location.reload();
    }
};

// Calcul du nombre total d'article dans le panier
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        let productQuantity = parseInt(product.quantity);
        number += productQuantity;
    }
    return number;
}

// Calcul du prix total du panier
async function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        let prod = await getProduct(product.id);
        let productQuantity = parseInt(product.quantity);
        total += productQuantity * prod.price;
    }
    return total;
}


export {
    getBasket,
    addBasket,
    removeFromBasket,
    changeQuantity,
    getNumberProduct,
    getTotalPrice,
    saveBasket
};