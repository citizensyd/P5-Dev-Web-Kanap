// Récupérer un produit dans l'api
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      return alert("Visiblement nous avons un petit soucis ! Cet article revient très vite !");
    })
}

// Récupérer tous les produits dans l'api
async function getProducts() {
  try {
    const res = await fetch(`http://localhost:3000/api/products`);
    const products = res.json();
    return products
  } catch (error) {
    return alert("Visiblement nous avons un petit soucis ! Ces articles reviennent très vite !");
  }
}

// Afficher une alerte quand on demande plus de 100 produits d'une couleur
function alertMoreThanHundredProduct(product) {
  if (product.quantity >= 100) {
    product.quantity = 100;
    alert("Vous avez atteint le maximun de 100 articles de cette couleur dans votre panier !")
  }
}

// Exportation de fonctions vers d'autres fichiers js
export {
  getProduct,
  getProducts,
  alertMoreThanHundredProduct
};