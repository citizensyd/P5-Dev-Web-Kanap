items()

async function items(){
  const products = await getProducts()
  for (product of products){
    displayProducts(product)
    console.log(products)
  }
}

function getProducts(){
  return fetch(`http://localhost:3000/api/products`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    return value
  })
  .catch(function(error) {
    alert(error)
  })
}

function displayProducts() {
  document.getElementById("items").innerHTML +=`
  <a href="">
  <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
  </a>`
}




