import { postCart } from "./modules/postCart.js";
import { isAdminIsLogged } from "./modules/isAdmin.js";

const elementoPai = document.getElementById("container-products");
const base_URL = "https://byteshop-backend-kgup.onrender.com/api/products";
const paragrafo = document.createElement("p");
const lista = document.createElement("ul");
let produtosArr = [];

isAdminIsLogged();

async function pegarDados() {
  try {
    const res = await fetch(base_URL);
    const data = await res.json();
    produtosArr = data;

    criarCard();
  } catch (err) {
    paragrafo.innerHTML = "Erro ao buscar dados";
    elementoPai.appendChild(paragrafo);
  }
}

function criarCard() {
  let listHTML = "<ul>";

  produtosArr.forEach((product) => {
    listHTML += `
      <li class="Card-produto">
        <a href="/products.html?id=${product.id}" target="_blank">
          <img class="Img-card" src="${product.img}" alt="${product.product_name}">
          <h3>${product.product_name}</h3>
          <p class="Description">${product.product_description}</p>
        </a>

        <div class="priceCart">
          <p class="Price">${product.price}</p> 
          <button 
            title="Adicionar ao carrinho" 
            class="cartBtn" 
            data-id="${product.id}" 
            data-name="${product.product_name}">
            <img src="./images/icons/addcart.svg">
          </button>
        </div>
      </li>`;
  });

  listHTML += "</ul>";
  elementoPai.innerHTML = listHTML;

  const cartBtns = document.querySelectorAll(".cartBtn");

  cartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-id");
      const productName = btn.getAttribute("data-name");
      const item = produtosArr.find((p) => p.id === Number(productId));

      postCart(item);
    });
  });
}

pegarDados();
