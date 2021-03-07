let loginSwitch;

if (
  localStorage.getItem("loggedIN") === null ||
  localStorage["loggedIN"] === "false"
) {
  loginSwitch = false;
  localStorage.setItem("loggedIN", false);
  window.location.href = "home.html";
} else if (localStorage["loggedIN"] === "true") {
  if (loginSwitch === false) {
    window.location.href = "dashboard.html";
    loginSwitch = true;
  }
}

if (localStorage["location"] === "index") {
  window.location.href = "home.html";
}
