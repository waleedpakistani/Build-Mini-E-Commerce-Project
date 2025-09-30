if (!localStorage.getItem("email") || !localStorage.getItem("userId")) {
  window.location.href = "customersignin.html";
}

function LogOut() {
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  localStorage.removeItem("productId");

  localStorage.clear();

  window.location.href = "customersignin.html";
}

window.onload = async function () {
  const customerId = localStorage.getItem("userId");

  let name = document.getElementById("name");
  let address = document.getElementById("address");

  try {
    let response = await axios.get("http://localhost:3000/customers", {
      parmas: {
        id: customerId,
      },
    });

    const customer = response.data[0];

    name.value = customer.name;
    address.value = customer.address;
  } catch (e) {
    console.log(e);
  }
};

async function CustomerShow() {
  const customerId = localStorage.getItem("userId");

  let name = document.getElementById("name");
  let address = document.getElementById("address");

  try {
    await axios.patch(`http://localhost:3000/customers/${customerId}`, {
      name: name.value,
      address: address.value,
    });

    alert("Customer updated successfully.");
  } catch (e) {
    console.error("Error updating customer data:", e);
  }
}
