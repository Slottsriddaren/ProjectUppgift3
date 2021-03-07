let empty = true;
let open = false;

document.getElementById("menuButton").addEventListener("click", () => {
  if (open === true) {
    document.getElementById("menuButton").style.color = "#322E18";
    document.getElementById("menu").style.transform = "translate(85vw, -100vh)";

    empty = true;
    open = false;

    setTimeout(() => {
      if (localStorage["location"] === "home") {
        window.location.href = "home.html";
      } else if (localStorage["location"] === "dashboard") {
        window.location.href = "dashboard.html";
      }
    }, 500);
  }

  if (empty === true && open === false) {
    empty = false;
    open = true;

    document.getElementById("menuButton").style.color = "white";
  }
});

if (empty === true && open === false) {
  if (localStorage["loggedIN"] === "true") {
    document.getElementById("login").innerText = "Dashboard";
    document.getElementById("login").href = "dashboard.html";
    document.getElementById("menu").innerHTML +=
      "<a id='logout' href='#'>Logout</a>";
    logoutStyle();

    document.getElementById("logout").addEventListener("click", () => {
      localStorage["loggedIN"] = "false";
      localStorage["logged-in-user"] = "";
      location.href = "home.html";
      location.reload();
    });
  }
  if (localStorage["loggedIN"] === "false") {
    document.getElementById("login").href = "login.html";
  }
}

function logoutStyle() {
  document.getElementById("logout").style = `text-decoration: none;
    color: white;
    font-size: 25pt;
    margin-bottom: 5vh;`;
}
