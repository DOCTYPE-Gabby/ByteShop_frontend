import { clearAllInputs } from "./modules/clearAll.js";

const isUser = JSON.parse(window.localStorage.getItem("User"));
const inputs = Array.from(document.querySelectorAll("input"));
const formBtn = document.getElementById("login-btn");
const userURL = "https://byteshop-backend-kgup.onrender.com/api/login";
const errorMsg = document.getElementById("error-p");

inputs.forEach((inp) => {
  inp.addEventListener("input", () => {
    if (inp.type === "email") {
      validateEmail(inp);
    }
    if (inp.type === "password") {
      validatePassword(inp);
    }
  });
});

function validateEmail(input) {
  const inputValue = input.value;

  if (!inputValue.includes("@") || !inputValue.includes(".com")) {
    errorMsg.textContent = "Insira um email válido";
    return false;
  }

  if (inputValue === "") {
    errorMsg.textContent = "o campo não pode ficar vazio";
    return false;
  }

  errorMsg.textContent = "";
  return true;
}

function validatePassword(input) {
  const inputValue = input.value;

  if (inputValue === "") {
    errorMsg.textContent = "o campo não pode ficar vazio";
    return false;
  }

  if (inputValue.length < 8) {
    errorMsg.textContent = "senha inválida!";
    return false;
  }

  errorMsg.textContent = "";
  return true;
}

function allValid(inpEmail, inpPassword) {
  const emailOk = validateEmail(inpEmail);
  const passwordOk = validatePassword(inpPassword);

  if (emailOk && passwordOk) {
    return true;
  } else {
    return false;
  }
}

console.log(isUser);

async function sendData() {
  const email = inputs.find((inp) => inp.type === "email");
  const password = inputs.find((inp) => inp.type === "password");

  const dados = {
    email: email.value,
    password: password.value,
  };

  if (allValid(email, password) && isUser === null) {
    try {
      const data = await fetch(userURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const res = await data.json();

      if (data.status === 200) {
        window.localStorage.setItem("User", JSON.stringify(res));
      } else {
        window.localStorage.removeItem("User");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendData();
  clearAllInputs();
});
