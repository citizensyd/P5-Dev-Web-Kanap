main()

async function main(){
  const products = await getProducts()
  console.log(products)
  displayProducts(products)
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

let elt = document.getElementById('items');
elt.innerHTML = `<a href="">
<article>
  <img src="" alt="">
  <h3 class="productName"></h3>
  <p class="</p>
</article>
</a>`;




