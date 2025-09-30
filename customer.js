async function CreateCustomerAccount() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let address = document.getElementById("address").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmpassword = document.getElementById("confirmpassword").value.trim();
  let nameerror = document.getElementById("nameerror");
  let emailerror = document.getElementById("emailerror");
  let addresserror = document.getElementById("addresserror");
  let passworderror = document.getElementById("passworderror");
  let confirmpasserror = document.getElementById("confirmpasserror");

  nameerror.style.display = "none";
  emailerror.style.display = "none";
  addresserror.style.display = "none";
  passworderror.style.display = "none";
  confirmpasserror.style.display = "none";

  let isvalid = true;

  if (name === "") {
    nameerror.innerHTML = "Please enter your name";
    nameerror.style.color = "red";
    nameerror.style.fontSize = "12px";
    nameerror.style.display = "block";
    isvalid = false;
  }

  if (email === "") {
    emailerror.innerHTML = "Please enter your email error";
    emailerror.style.color = "red";
    emailerror.style.fontSize = "12px";
    emailerror.style.display = "block";
    isvalid = false;
  }

  if (address === "") {
    addresserror.innerHTML = "Please enter your address";
    addresserror.style.color = "red";
    addresserror.style.fontSize = "12px";
    addresserror.style.display = "block";
    isvalid = false;
  }

  if (password === "") {
    passworderror.innerHTML = "Please enter your password";
    passworderror.style.color = "red";
    passworderror.style.fontSize = "12px";
    passworderror.style.display = "block";
    isvalid = false;
  }

  if (confirmpassword !== password) {
    confirmpasserror.innerHTML = "Invalid Password";
    confirmpasserror.style.color = "red";
    confirmpasserror.style.fontSize = "12px";
    confirmpasserror.style.display = "block";
    isvalid = false;
  }

  if (!isvalid) return;

  try {
    await axios.post("http://localhost:3000/customers", {
      name: name,
      email: email,
      address: address,
      password: password,
    });
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
  } catch (error) {
    console.log(error);
  }
}

async function ShowCustomerResult() {
  let email1 = document.getElementById("email1").value;
  let password1 = document.getElementById("password1").value;

  let emailerror1 = document.getElementById("emailerror1");
  let passworderror1 = document.getElementById("passworderror1");
  let userInvalid = document.getElementById("userInvalid");

  emailerror1.style.display = "none";
  passworderror1.style.display = "none";
  userInvalid.style.display = "none";

  let isvalid = true;
  if (email1 === "") {
    emailerror1.innerHTML = "Please enter your email address";
    emailerror1.style.color = "red";
    emailerror1.style.fontSize = "12px";
    emailerror1.style.display = "block";
    isvalid = false;
  }
  if (password1 === "") {
    passworderror1.innerHTML = "Please enter your password";
    passworderror1.style.color = "red";
    passworderror1.style.fontSize = "12px";
    passworderror1.style.display = "block";
    isvalid = false;
  }
  if (!isvalid) return;

  try {
    let response = await axios.get("http://localhost:3000/customers", {
      params: {
        email: email1,
        password: password1,
      },
    });

    if (response.data.length === 0) {
      userInvalid.innerHTML = "User data is invalid";
      userInvalid.style.color = "red";
      userInvalid.style.fontSize = "12px";
      userInvalid.style.display = "block";
    } else {
      localStorage.setItem("email", email1);
      localStorage.setItem("userId", response.data[0].id);
      window.location.href = "customerprofile.html";
    }
  } catch (error) {
    console.error("API error:", error);
    userInvalid.innerHTML = "Something went wrong. Please try again.";
    userInvalid.style.color = "red";
    userInvalid.style.fontSize = "12px";
    userInvalid.style.display = "block";
  }
}
