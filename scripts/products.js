import { postCart } from "./modules/postCart.js";
import { isAdminIsLogged } from "./modules/isAdmin.js";

const elementoPai = document.getElementById("produto-div");
const elementoAvo = document.getElementById("main-product-container");

isAdminIsLogged();

const paragrafo = document.createElement("p");
let produtosArr = null;
const urlParams = new URLSearchParams(location.search);
const urlId = Number(urlParams.get("id"));
const base_URL_PRODUCTS = `https://byteshop-backend-kgup.onrender.com/api/admin/products/${urlId}`;
let produtoEncontrado = null;
async function pegarDados() {
  try {
    const res = await fetch(base_URL_PRODUCTS);
    const dados = await res.json();
    produtoEncontrado = dados;
    console.log(produtoEncontrado);
    renderProduct();
  } catch (error) {
    console.log("ERRO AO BUSCAR PRODUTO");
  }
}

pegarDados();

function renderProduct() {
  if (produtoEncontrado) {
    elementoAvo.innerHTML = `
    <img class="Product-img" src="${produtoEncontrado.img}" alt="${produtoEncontrado.product_name}">
    <div class="Products-produto-div" id="produto-div">
    <h1>${produtoEncontrado.product_name}</h1>
    <p class="Long-description">${produtoEncontrado.long_description}</p>
    <a class="Index-btn-container" href="index.html">
      <button class="Btn-index">Voltar</button>
    </a>
        <button title="Adicionar ao carrinho" class="Btn-index" id="btn-add-cart"><img src="./images/icons/addcart.svg"></button>
  </div>`;

    const btnAdd = document.getElementById("btn-add-cart");
    btnAdd.addEventListener("click", () => postCart(produtoEncontrado));
  } else {
    const div404 = document.createElement("div");

    div404.classList.add("Hide");
    div404.style.display = "block";
    div404.innerText = "404 Produto Não Encontrado!";
    elementoAvo.appendChild(div404);
  }
}
