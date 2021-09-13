const loadProducts = () => {
  const url = '../js/db.json';
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));

  const inputText = document.getElementById('input-field');
  inputText.value = "";

};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    




      <div class="text-center h-100 single-product ">
      <img class=" product-image mx-auto" src=${image}></img>
      <div class="card-body">
      <h3>${product.title.slice(0, 30)}</h3>
      <p><span class="fw-bold">Category: </span> ${product.category}</p>
      <p><span class="fw-bold">Rating: </span>${product.rating.rate} 
      </p>
      <p>
      <i class=" fas fa-star text-warning"></i>
      <i class=" fas fa-star text-warning"></i>
      <i class=" fas fa-star text-warning"></i>
      <i class=" fas fa-star text-warning"></i>
      <i class="far fa-star text-warning"></i>
      </p>
      <p><i class="fas fa-user-check mx-2 text-primary"></i><span class="fw-bold">${product.rating.count}</span> Person rated this product</p>
      
      </div>
      <div class="text-center">
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      </div>
    </div>










      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
  document.getElementById("add-cart").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);

};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted < 200) {
    setInnerText("delivery-charge", 20);
  }
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
