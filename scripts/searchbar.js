console.log("searchbar carregou");

const form = document.querySelector(".Search-container");
const input = document.getElementById("search-inp");

if (form && input) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = input.value.trim();
    if (!termo) return;
    window.location.href = `search.html?search=${encodeURIComponent(termo)}`;
  });
}