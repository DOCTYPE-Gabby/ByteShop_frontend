import { clearAllInputs } from "./modules/clearAll.js";

const emailsArr = Array.from(document.querySelectorAll("input[type=email]"));
const passwordsArr = Array.from(
  document.querySelectorAll("input[type=password]"),
);

const pEmailErr = document.createElement("p");
const pPassErr = document.createElement("p");

const firstEmail = emailsArr[0];
const secondEmail = emailsArr[1];

const password1stInp = passwordsArr[0];
const password2ndInp = passwordsArr[1];

const button = document.getElementById("createAccount");

let emailIsValid = false;
let passIsValid = false;

// verificar Email
function confirmEmail(email) {
  const confirmEmail = email;
  let err = false;

  if (confirmEmail != firstEmail.value) {
    err = true;
    emailError(err);
  } else {
    err = false;
    emailError(err);
  }
}

function emailError(err) {
  const next = secondEmail.nextElementSibling;

  if (err === true && !next.classList.contains("errorEmail")) {
    pEmailErr.classList.add("errorEmail");
    pEmailErr.innerText = "Os emails precisam ser iguais!";
    secondEmail.insertAdjacentElement("afterend", pEmailErr);
  }

  if (err === true && pEmailErr.innerText === "") {
    pEmailErr.innerText = "Os emails precisam ser iguais!";
    pEmailErr.style.display = "block";
  }

  if (
    err === false &&
    next.classList.contains("errorEmail") &&
    pEmailErr.innerText != ""
  ) {
    pEmailErr.innerText = "";
    pEmailErr.style.display = "none";
    emailIsValid = true;
  }

  if (err === false) {
    emailIsValid = true;
  }
}

function passwordCheck(password) {
  const upperCase = /[A-Z]/;
  const firstPassInp = password1stInp.value;
  const secondPassInp = password2ndInp.value;

  let err = null;

  if (password != firstPassInp) {
    err = true;
    showPassError(err, 0);
  } else if (firstPassInp === secondPassInp && secondPassInp.length < 8) {
    err = true;
    showPassError(err, 1);
    return;
  } else if (
    firstPassInp === secondPassInp &&
    upperCase.test(secondPassInp) === false
  ) {
    err = true;
    showPassError(err, 2);
    return;
  } else if (
    firstPassInp === secondPassInp &&
    /[!@#$%¨&*]/.test(secondPassInp) === false
  ) {
    err = true;
    showPassError(err, 3);
    return;
  } else {
    err = false;
    showPassError(err, null);
  }
}

function showPassError(err, errType) {
  let msg = null;
  const next = password2ndInp.nextElementSibling;

  if (err === true && !next.classList.contains("errorPass")) {
    pPassErr.classList.add("errorPass");
    msg = passErrMsg(errType);
    pPassErr.innerText = msg;
    password2ndInp.insertAdjacentElement("afterend", pPassErr);
  }

  if (err === true && pPassErr.innerText === "") {
    msg = passErrMsg(errType);
    pPassErr.innerText = msg;
    password2ndInp.insertAdjacentElement("afterend", pPassErr);
  }

  if (err === true && pPassErr.innerText != "") {
    msg = passErrMsg(errType);
    pPassErr.innerText = msg;
  }

  if (err === false && pPassErr.innerText != "") {
    msg = passErrMsg(errType);
    pPassErr.innerText = msg;
    passIsValid = true;
  }

  if (err === false) {
    passIsValid = true;
  }
}

function passErrMsg(errType) {
  let msg = null;

  const errors = [
    "As senhas precisam ser iguais",
    "A senha precisa conter ao menos 8 caracteres",
    "A senha precisa conter ao menos uma letra maiúscula",
    "A senha precisa conter ao menos um caractere especial",
  ];

  if (errType === 0) return errors[0];
  if (errType === 1) return errors[1];
  if (errType === 2) return errors[2];
  if (errType === 3) return errors[3];
  if (errType === null) return "";
}

secondEmail.addEventListener("input", () => {
  confirmEmail(secondEmail.value);
});

password2ndInp.addEventListener("input", () => {
  passwordCheck(password2ndInp.value);
});

async function postData() {
  const link = `https://byteshop-backend-kgup.onrender.com/api/create-account`;
  const name = document.getElementById("name");

  const dataBody = {
    name: name.value,
    email1: firstEmail.value,
    email2: secondEmail.value,
    password1: password1stInp.value,
    password2: password2ndInp.value,
  };

  const data = await fetch(link, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dataBody),
  });

  const res = await data.json();
  console.log("deu certo? ", res);
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("pass and email, ", passIsValid);
  if (passIsValid && emailIsValid === true) {
    console.log("chegou if");
    postData();
    //clearAllInputs();
    console.log("post feito");
  }
});
