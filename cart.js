window.onload = async function () {
  try {
    let cartResponse = await axios.get("http://localhost:3000/carts");
    const cartItems = cartResponse.data;

    let productsResponse = await axios.get("http://localhost:3000/products");
    const products = productsResponse.data;

    let showallproducts = document.getElementById("showallproducts");
    let html = "";

    for (let i = 0; i < cartItems.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (cartItems[i].productId === products[j].id) {
          html += `<h3>${products[j].title}</h3>`;
          html += `<h4>RS${products[j].price}</h4>`;
          html += `<img src="${products[j].savelinks}" alt="Product Image" style="width:100px; height:50px; border-radius: 50%;">`;
          html += `<p>${products[j].description}</p>`;
          html += `<button onclick="Delete('${cartItems[i].id}')">Delete</button>`;
          html += `<hr>`;
          break;
        }
      }
    }

    showallproducts.innerHTML = html;
  } catch (error) {
    console.log("Error:", error);
  }
};

async function Delete(cartItemId) {
  try {
    await axios.delete(`http://localhost:3000/carts/${cartItemId}`);
  } catch (error) {
    console.log("Error deleting product:", error);
  }
}
