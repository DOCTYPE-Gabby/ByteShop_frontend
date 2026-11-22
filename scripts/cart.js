import { isAdminIsLogged } from "./modules/isAdmin.js";

window.addEventListener("DOMContentLoaded", () => {

    const mainContainer = document.querySelector("main");
    const userData = JSON.parse(localStorage.getItem("User"));
    const userId = Number(userData?.id);
    const priceTotal = document.getElementById('total');


    isAdminIsLogged();
    let price = 0
    async function criarCard(dados) {
        dados.forEach(item => {
            console.log(item);

            const divCartItem = document.createElement("div");
            divCartItem.classList.add("productCart");

            divCartItem.innerHTML = `
                <img src="${item.img}" alt="${item.product_name}">
                <h1>${item.product_name}</h1>
                <p>${item.product_description} R$: ${item.price}</p>
                <button class="delete-btn" data-id="${item.id}" data-name="${item.product_name}">Delete</button>
            `;
            price += Number(item.price)
            priceTotal.innerText = `Total: ${price}`
            console.log(price)
            mainContainer.appendChild(divCartItem);

        });
    }  
  

    if (userData) {

        const cartUrl = `https://byteshop-backend-kgup.onrender.com/api/cart/${userId}`;
        console.log(userData, userId);

        async function getCart() {
            try {
                const res = await fetch(cartUrl);
                const dataJson = await res.json();

                if (Array.isArray(dataJson) && dataJson.length > 0) {
                    criarCard(dataJson);
                } else {
                    mainContainer.textContent = "carrinho vazio";
                }

            } catch (err) {
                console.log(err);
            }
        }

        getCart();

        mainContainer.addEventListener("click", (e) => {
            if (mainContainer.querySelectorAll(".productCart").length === 0) {
                mainContainer.textContent = "Carrinho vazio";
            }

            const target = e.target;

            if (target.classList.contains("delete-btn")) {
                const productId = e.target.dataset.id;
                deleteCart(userId, productId);

                const productDiv = e.target.closest(".productCart");
                productDiv.remove();
            }
        });

    } else {
        window.location.href = "index.html";
        alert("faça login para acessar o carrinho");
    }

    async function deleteCart(userId, product) {
        try {
            const deleteURL = `https://byteshop-backend-kgup.onrender.com/api/cart/delete`;
            await fetch(deleteURL, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, product })
            });

        } catch (err) {
            console.log(err);
        }
    }

});
