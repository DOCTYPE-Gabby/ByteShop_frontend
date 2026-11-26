export async function postCart (product) {
  let userData = window.localStorage.getItem("User")
  if (userData) {
    const userObj = JSON.parse(userData)
    const userId = Number(userObj.id)
    const cartUrl = `https://byteshop-backend-kgup.onrender.com/api/cart/${userId}`;
    const res = await fetch (cartUrl, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(product)
  })
  }
  
}