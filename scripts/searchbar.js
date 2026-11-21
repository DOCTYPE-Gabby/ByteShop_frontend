const form = document.querySelector(".Search-container");

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const value = document.getElementById("search-inp").value;
    if (!value) return;
    window.location.href = `search.html?search=${encodeURIComponent(value)}`;
});
