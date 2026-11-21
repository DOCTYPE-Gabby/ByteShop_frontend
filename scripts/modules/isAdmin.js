export async function isAdminIsLogged() {
  const userStr = window.localStorage.getItem("User");
  const user = JSON.parse(userStr)
  const loginHtml = document.getElementById('login-btn')
  if (user != null && user.isAdmin === 1 && user.logged === true ) {
    const adminPage = document.getElementById('menu-img-user');
    adminPage.title = "Acessar a Página do Administrador";
    loginHtml.setAttribute("href", "admin.html");
    return true
  } 
  else {
    return false
  }
}