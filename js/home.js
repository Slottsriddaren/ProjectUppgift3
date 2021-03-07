let nav = document.getElementById("nav");

localStorage["error-message"] = "";
localStorage.setItem("location", "home");

document.getElementById("getStarted").addEventListener("click", () => {
  window.location.href = "register.html";
});
