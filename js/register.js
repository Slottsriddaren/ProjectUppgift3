if (localStorage.getItem("totalAccounts") === null) {
  localStorage.setItem("totalAccounts", 0);
}

let totalAccounts = parseInt(localStorage["totalAccounts"]);

let User1 = {
  email: "test@gmail.com",
  password: "test",
  todolist: [1, 2, 3],
  darkMode: false,
};

document.getElementById("submit").addEventListener("click", () => {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  let userConfirmPassword = document.getElementById("confirmPassword").value;

  let User = {
    email: userEmail,
    password: userPassword,
    todolist: [],
    darkMode: false,
  };

  if (totalAccounts > 0) {
    for (let i = 0; i < totalAccounts; i++) {
      if (
        JSON.parse(localStorage.getItem("account" + i)).email === userEmail ||
        userPassword === "" ||
        userConfirmPassword === ""
      ) {
        localStorage["error-message"] = localStorage["email-error-message"];
      } else if (
        userPassword === userConfirmPassword &&
        JSON.parse(localStorage.getItem("account" + i)).email != userEmail
      ) {
        addAccountToLocalStorage(User);
        localStorage["error-message"] = "";
        localStorage["register"] = "true";
        break;
      } else if (userPassword !== userConfirmPassword) {
        localStorage["error-message"] = localStorage["password-error-message"];
      }
    }
  } else {
    addAccountToLocalStorage(User);
  }
});

if (localStorage.getItem("register") === null) {
  localStorage.setItem("register", false);
}

if (localStorage["register"] === "true") {
  window.location.href = "login.html";
  localStorage["register"] = "false";
}

if (localStorage["loggedIN"] === "true") {
  window.location.href = "dashboard.html";
}

if (localStorage.getItem("password-error-message") === null) {
  localStorage.setItem(
    "password-error-message",
    "<p id='error-message'>Password does not meet the requierments!</p>"
  );
}

if (localStorage.getItem("email-error-message") === null) {
  localStorage.setItem(
    "email-error-message",
    "<p id='error-message'>The email you entered already exists!</p>"
  );
}

if (localStorage.getItem("error-message") === null) {
  localStorage.setItem("error-message", "");
}

if (performance.type == performance.TYPE_RELOAD) {
  document.getElementById("error-messages").innerHTML =
    localStorage["error-message"];
}

function addAccountToLocalStorage(User) {
  localStorage.setItem("account" + totalAccounts, JSON.stringify(User));
  totalAccounts++;
  localStorage["totalAccounts"] = totalAccounts;
}