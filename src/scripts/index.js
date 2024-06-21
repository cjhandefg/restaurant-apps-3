import "regenerator-runtime";
import "../styles/main.css";
import App from "./views/app.js";
import swRegister from "./utils/sw-register";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const drawer = document.getElementById("drawer");

  menuButton.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    drawer.setAttribute("aria-hidden", !isOpen);
  });

  const skipToContent = document.createElement("a");
  skipToContent.href = "#main-content";
  skipToContent.className = "skip-to-content";
  skipToContent.innerText = "Skip to Content";
  document.body.prepend(skipToContent);
  skipToContent.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#main-content").focus();
  });

  const appBar = document.querySelector(".app-bar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      appBar.classList.add("scrolled");
    } else {
      appBar.classList.remove("scrolled");
    }
  });
});

const app = new App({
  button: document.querySelector("#menu-button"),
  drawer: document.querySelector("#navigationDrawer"),
  content: document.querySelector("#main-content"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
