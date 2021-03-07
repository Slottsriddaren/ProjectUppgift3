localStorage["location"] = "login";

if (localStorage.getItem("logged-in-user") === null) {
  localStorage.setItem("logged-in-user", "");
}

document.getElementById("submit").addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let totalAccounts = parseInt(localStorage["totalAccounts"]);

  for (let i = 0; i < totalAccounts; i++) {
    if (
      JSON.parse(localStorage.getItem("account" + i)).email === email &&
      JSON.parse(localStorage.getItem("account" + i)).email !== ""
    ) {
      if (
        JSON.parse(localStorage.getItem("account" + i)).password === password
      ) {
        localStorage["loggedIN"] = true;
        localStorage["logged-in-user"] = email;
        break;
      }
    } else if (i === totalAccounts - 1) {
      localStorage["error-message"] = localStorage["login-error-message"];
    }
  }
});

if (localStorage["loggedIN"] === "true") {
  window.location.href = "dashboard.html";
}

if (localStorage.getItem("login-error-message") === null) {
  localStorage.setItem(
    "login-error-message",
    "<p id='error-message'>Email or password is incorrect!</p>"
  );
}

if (performance.type == performance.TYPE_RELOAD) {
  document.getElementById("error-messages").innerHTML =
    localStorage["error-message"];
}
