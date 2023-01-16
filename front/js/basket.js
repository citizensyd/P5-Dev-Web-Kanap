import {
    getProduct
} from "../js/generique.js"

function saveBasket(basket) {
    let basketString = JSON.stringify(basket);
    localStorage.setItem("basket", basketString);
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return basket = [];
    } else {
        return JSON.parse(basket)
    }
}

function addBasket(productAdd) {
    let basket = getBasket();
    let foundProduct = basket.find((p => p.id == productAdd.id) && (y => y.color == productAdd.color));
    if (productAdd.quantity > 100){
        productAdd.quantity = 100
    }
    if (foundProduct != undefined) {
        let result = foundProduct.quantity += productAdd.quantity;
        if (result > 100){
            foundProduct.quantity = 100
        }
    } else {
        basket.push(productAdd);
    }
    saveBasket(basket);
}

function removeFromBasket(productId, productColor) {
    let basket = getBasket();
    basket = basket.filter((item) => !(item.id == productId && item.color == productColor));
    console.log(basket);
    saveBasket(basket);
}

function changeQuantity(productId, productColor, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find((item) => (item.id == productId && item.color == productColor));
    if (foundProduct != undefined) {
        foundProduct.quantity = quantity;
        location.reload();
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
            location.reload();
        } else {
            saveBasket(basket);
        };
    };
}

function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        let productQuantity = parseInt(product.quantity);
        number += productQuantity;
    }
    return number;
}

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