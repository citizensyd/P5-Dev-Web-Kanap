async function getProduct(productId) {
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

async function getProducts() {
  return fetch(`http://localhost:3000/api/products`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (error) {
      alert(error);
    })
}

export {
  getProduct,
  getProducts
};