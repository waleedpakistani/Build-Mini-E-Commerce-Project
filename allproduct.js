window.onload = async function () {
  try {
    let response = await axios.get("http://localhost:3000/products");
    const products = response.data;

    let showallproducts = document.getElementById("showallproducts");

    let html = "";

    for (let i = 0; i < products.length; i++) {
      html += `<h3> ${products[i].title} </h3>`;
      html += `<h4>RS${products[i].price} </h4>`;
      html += `<img src="${products[i].savelinks}" alt="Product Image" style="width:100px; height:50px; border-radius: 50%;">`;
      html += `<p>${products[i].description}</p>`;
      html += `<button onclick = "BuyProducts('${products[i].id}')">Add to cart </button>`;
      html += `<hr>`;
    }
    showallproducts.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

async function BuyProducts(productId) {
  const customerId = localStorage.getItem("userId");

  try {
    await axios.post("http://localhost:3000/carts", {
      productId: productId,
      customerId: customerId,
    });
  } catch (error) {
    console.log(error);
  }
}

function ShowCustomerBuyProducts() {
  window.location.href = "cart.html";
}
