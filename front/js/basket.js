function saveBasket(basket) {
    let basketString = JSON.stringify(basket);
    localStorage.setItem("basket", basketString);
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
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

function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}

function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    }
}

function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}

export {
    getBasket,
    addBasket,
    removeFromBasket,
    changeQuantity,
    getNumberProduct,
    getTotalPrice
};