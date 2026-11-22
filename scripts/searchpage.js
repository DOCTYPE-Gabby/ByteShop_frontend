import { postCart } from "./modules/postCart.js";

window.addEventListener("DOMContentLoaded", () => {
  function pegarUrl() {
    const dadosURL = new URLSearchParams(window.location.search);
    const pesquisa = dadosURL.get("search");

    if (pesquisa) {
      return pesquisa;
    } else {
      return null;
    }
  }

  async function getData() {
    const search = pegarUrl();

    if (search) {
      const valorlimpo = search.trim();

      try {
        const dados = await fetch(
          `/search?search=${encodeURIComponent(valorlimpo)}`,
        );
        const res = await dados.json();
        return res;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  }

  async function renderData() {
    const divProduto = document.getElementById("container-products");
    const pesquisa = pegarUrl();
    const dados = await getData();

    const searchResult = document.getElementById("searchResult");
    searchResult.innerText = `Resultado da pesquisa por: ${pesquisa}`;

    if (!dados) return;

    dados.forEach((product) => {
      divProduto.innerHTML = `
                <img class="Product-img-search" src="${product.img}" alt="${product.product_name}">
                
                <div class="Products-produto-div" id="produto-div">
                    <h1>${product.product_name}</h1>
                    <p class="Long-description">${product.long_description}</p>

                    <a class="Index-btn-container" href="index.html">
                        <button class="Btn-index">Voltar</button>
                    </a>

                    <button class="Btn-index" id="addCart">
                        <img src="./images/icons/addcart.svg">
                    </button>
                </div>
            `;

      const cartBtn = document.getElementById("addCart");
      cartBtn.addEventListener("click", () => {
        postCart(product);
      });
    });
  }

  renderData();
});
