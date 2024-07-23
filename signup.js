const input = document.querySelectorAll(".getInput");

const sub = document.querySelector("#submit");
const username = document.querySelector("#userName");
const password = document.querySelector("#password");
const rePassword = document.querySelector("#rePassword");
const mobile = document.querySelector("#mobile");

function handle() {
  input.forEach((i) => {
    let val = i.value;
    i.style.border = "2px solid green";
    let forError = i.getAttribute("id");
    if (val !== "") {
      checkPassword();
    } else {
      console.log("no value");
      i.style.border = "2px solid red";
      i.placeholder = `please enter ${forError}`;
    }
  });
}

function storeValue() {
  const userData = {
    username: username.value,
    password: password.value,
    mobile: mobile.value,
  };
  localStorage.setItem(" userData", JSON.stringify(userData));
}

function checkPassword() {
  if (password.value !== rePassword.value) {
    console.log("password not matched");
    rePassword.value = "";
    rePassword.style.border = "2px solid red";
    rePassword.placeholder = `your password didn't matched !`;
  } else {
    console.log("password matched");
    storeValue();
  }
}
sub.addEventListener("click", () => {
  handle();
});
let isNewUser = false;
const alreadyUser = document.querySelector("#alreadyUser");
const forToggle = document.querySelectorAll(".for-toggle");

alreadyUser.addEventListener("click", () => {
  forToggle.forEach((element) => {
    element.classList.toggle("hidden");

  });
  if (!isNewUser) {
    alreadyUser.innerText = "New User";
    console.log(" Dont have account")
  isNewUser = true;

    
  } else {
    alreadyUser.innerText = "Already have account";
    isNewUser = false;
    console.log(" already have account")

  }
});
