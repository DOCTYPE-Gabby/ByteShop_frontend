const inputs = Array.from(document.querySelectorAll("input"));
const uploadBtn = document.getElementById("btnUpload");
const inpFile = document.getElementById("inpFile");
const imgPreview = document.getElementById("img");
const xIcon = document.getElementById("xIcon");
const form = document.querySelector("form");
const adminContainer = document.querySelector(".adminContainer");
const user = window.localStorage.getItem("User");
const inputsError = {};
function getUser() {
  const userParsed = JSON.parse(user);
  if (userParsed === null) {
    window.location.href = "index.html";
  }
  if (userParsed.isAdmin === 0) {
    inputs.forEach((inp) => {
      inp.readOnly = true;
      window.location.href = "index.html";
    });
  }
}

getUser();

inputs.forEach((input) =>
  input.addEventListener("input", () => {
    inputType(input);
  }),
);

function handleNumber(input) {
  const value = Number(input.value);
  const name = input.name;
  if (isNaN(value)) {
    let err = true;
    inputsError[name] = err;
  }
}

function handleError(input, msg, err) {
  let next = input.nextElementSibling;
  if (!next || !next.classList.contains("errorPInput")) {
    let errorP = document.createElement("p");
    errorP.classList.add("errorPInput");
    input.insertAdjacentElement("afterend", errorP);
    next = errorP;
  }
  if (err) {
    next.textContent = msg;
    next.style.display = "block";
    input.style.border = "1px solid red";
  } else {
    next.textContent = "";
    next.style.display = "none";
    input.style.border = "1px solid #ccc";
  }
}

function handleText(input, name) {
  const inpValue = input.value;
  const limits = { inpNomeProduto: 20, inpDesCurta: 25, inpDesLonga: 60 };
  const words = inpValue.trim().split(/\s+/);
  const limit = limits[name];
  let err = false;
  let msg = "";
  if (words.length > limit) {
    msg = `passou do limite de caracteres ${limit} ${words.length}`;
    err = true;
    inputsError[name] = err;
    handleError(input, msg, err);
  } else {
    msg = "";
    err = false;
    handleError(input, msg, err);
  }
}

function inpClick() {
  inpFile.click();
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    imgPreview.style.display = "block";
    imgPreview.src = reader.result;
    imgPreview.alt = file.name;
  };
  reader.readAsDataURL(file);
  xIcon.style.display = "block";
}
uploadBtn.addEventListener("click", inpClick);

xIcon.addEventListener("click", () => {
  inpFile.value = "";
  imgPreview.src = "";
  imgPreview.style.display = "none";
  imgPreview.alt = "";
  xIcon.style.display = "none";
});

inpFile.addEventListener("change", () => {
  const data = inpFile.files[0];
  if (data) {
    handleFile(data);
  }
});

function inputType(input) {
  if (input.type === "text") {
    handleText(input, input.name);
  } else if (input.name === "inpPreco") {
    handleNumber(input);
  }
}

function validateForm() {
  return !Object.values(inputsError).some((e) => e);
}

async function sendData() {
  const formData = new FormData();
  inputs.forEach((inp) => {
    if (inp.type === "text") {
      formData.append(inp.name, inp.value);
    } else if (inp.type === "file" && inp.files[0]) {
      formData.append(inp.name, inp.files[0]);
    }
  });

  const fetchURL = `https://byteshop-backend-kgup.onrender.com/api/admin`;
  const dados = await fetch(fetchURL, {
    method: "POST",
    body: formData,
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (validateForm()) {
    await sendData();
  } else {
    console.log("Corrige os erros antes de enviar");
  }
});
