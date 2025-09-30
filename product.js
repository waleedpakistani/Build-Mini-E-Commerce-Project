if (!localStorage.getItem("email") || !localStorage.getItem("userId")) {
  window.location.href = "signin.html";
}

function LogOut() {
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  localStorage.removeItem("productId");

  localStorage.clear();

  window.location.href = "signin.html";
}

window.onload = function () {
  let showemail = document.getElementById("showemail");
  let savedEmail = localStorage.getItem("email");

  if (!showemail) {
    window.location.href = "signin.html";
    return;
  }

  showemail.innerHTML = savedEmail;

  LoadProducts();
};

async function SubmitProduct() {
  let userId = localStorage.getItem("userId");
  let title = document.getElementById("title").value.trim();
  let price = document.getElementById("price").value.trim();
  let savelinks = document.getElementById("savelinks").value.trim();
  let description = document.getElementById("description").value.trim();

  try {
    await axios.post("http://localhost:3000/products", {
      userId: userId,
      title: title,
      price: price,
      savelinks: savelinks,
      description: description,
    });

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("savelinks").value = "";
    document.getElementById("description").value = "";

    LoadProducts();
  } catch (error) {
    console.log(error);
  }
}

async function LoadProducts() {
  let userId = localStorage.getItem("userId");

  try {
    let response = await axios.get("http://localhost:3000/products", {
      params: { userId: userId },
    });

    const products = response.data;
    const productcategory = document.getElementById("productcategory");

    let html = "";
    for (let i = 0; i < products.length; i++) {
      html += `<h3>${products[i].title}</h3>`;
      html += `<h4>RS ${products[i].price}</h4>`;
      html += `<img src="${products[i].savelinks}" alt="Product Image" style="width:100px; height:50px; border-radius: 50%;">`;
      html += `<p>${products[i].description}</p>`;
      html += `<button onclick="DeleteProduct('${products[i].id}')">Delete</button>`;
      html += `<button onclick="EditProduct('${products[i].id}', '${products[i].title}', '${products[i].price}', '${products[i].savelinks}', '${products[i].description}')">Edit</button>`;
      html += `<hr>`;
    }

    productcategory.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

async function DeleteProduct(productId) {
  try {
    await axios.delete(`http://localhost:3000/products/${productId}`);
    LoadProducts();
  } catch (error) {
    console.log("Error deleting product:", error);
  }
}

function EditProduct(id, title, price, savelinks, description) {
  document.getElementById("title").value = title;
  document.getElementById("price").value = price;
  document.getElementById("savelinks").value = savelinks;
  document.getElementById("description").value = description;

  document.getElementById("btn1").style.display = "none";
  document.getElementById("btn2").style.display = "block";
  document.getElementById("btn3").style.display = "block";

  localStorage.setItem("productId", id);
}

async function Update() {
  let productId = localStorage.getItem("productId");
  if (!productId) return;

  let title = document.getElementById("title").value.trim();
  let price = document.getElementById("price").value.trim();
  let savelinks = document.getElementById("savelinks").value.trim();
  let description = document.getElementById("description").value.trim();

  try {
    await axios.patch(`http://localhost:3000/products/${productId}`, {
      title: title,
      price: price,
      savelinks: savelinks,
      description: description,
    });

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("savelinks").value = "";
    document.getElementById("description").value = "";

    document.getElementById("btn1").style.display = "block";
    document.getElementById("btn2").style.display = "none";
    document.getElementById("btn3").style.display = "none";

    localStorage.removeItem("productId");

    LoadProducts();
  } catch (error) {
    console.log(error);
  }
}

function CancelData() {
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("savelinks").value = "";
  document.getElementById("description").value = "";

  document.getElementById("btn1").style.display = "block";
  document.getElementById("btn2").style.display = "none";
  document.getElementById("btn3").style.display = "none";

  localStorage.removeItem("productId");
}

function Next() {
  window.location.href = "allproduct.html";
}
