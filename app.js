import HomePage from "./components/HomePage.js";
import LoginForm from "./components/loginForm.js";
import RegistrationForm from "./components/registrationForm.js"

function renderComponent(component) {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = "";
  appDiv.appendChild(component());
}

function navigateTo(route) {
  window.history.pushState({}, route, window.location.origin + route);
  router();
}

function router() {
    const path = window.location.pathname;
  
    if (path === "/login" && isLoggedIn()) {
      window.location.href = "/"; // Redirect logged-in users from login to home
    } else if (path === "/register" && isLoggedIn()) {
      window.location.href = "/"; // Redirect logged-in users from register to home
    } else if (path === "/register") {
      renderComponent(RegistrationForm);
    } else if (path === "/login") {
      renderComponent(LoginForm);
    } else {
      renderComponent(HomePage); // Default to HomePage
    }
  }

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  window.location.href = "/";
}

window.onpopstate = router;

document.addEventListener("DOMContentLoaded", router);
export { navigateTo, isLoggedIn, logout };
