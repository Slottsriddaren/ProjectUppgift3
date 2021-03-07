localStorage["location"] = "dashboard";

let totalAccounts = parseInt(localStorage["totalAccounts"]);
let accountIndex = "";

for (let i = 0; i < totalAccounts; i++) {
  if (
    JSON.parse(localStorage["account" + i]).email ===
    localStorage["logged-in-user"]
  ) {
    accountIndex = "account" + i;
    break;
  }
}

document.getElementById("headerLogoutButton").addEventListener("click", () => {
  localStorage["loggedIN"] = "false";
  localStorage["logged-in-user"] = "";
  window.location.href = "home.html";
});

function styleAfterWindowSize(x) {
  if (x.matches) {
    document.getElementById("todolist").style.gridTemplateAreas = `
  "item0"
  "item1"
  "item2"
  "item3"
  "item4"
  "item5"
  "item6"
  "item7"
  `;
    document.getElementById("container").style.flexDirection = "column";
  } else {
    document.getElementById("todolist").style.gridTemplateAreas = `
  "item0 item1"
  "item2 item3"
  "item4 item5"
  "item6 item7"
  `;
  }
}

document.getElementById("save").addEventListener("click", () => {
  location.reload();
});

let todolist = JSON.parse(localStorage[accountIndex]).todolist;

let windowWidth = window.matchMedia("(max-width: 700px)");

styleAfterWindowSize(windowWidth);

if (todolist.length === 0) {
  document.getElementById("ifemptyH1").innerText = "Your todo list is empty!";
  document.getElementById("ifemptyH2").innerText =
    "Click add new to create new element";
  document.getElementById("todolist").style.placeItems = "center";
} else {
  let todoListContainer = document.getElementById("todolist");

  todoListContainer.style.gridGap = "2rem";
}

document.getElementById("AddNew").addEventListener("click", () => {
  taskInfoShow("", "", "0", "", "", false);
});

document
  .getElementById("close-task-info-button")
  .addEventListener("click", () => {
    taskInfoHide();
    location.reload();
  });

function taskInfoShow(
  showTaskName,
  showAssigned,
  showProgress,
  showDeadline,
  showDescription,
  showTask
) {
  let progress = document.getElementById("progressbar-slider");
  let output = document.getElementById("percentage");
  let taskName = document.getElementById("Task-Name-id");
  let submitAddTask = document.getElementById("done");
  let assigned = document.getElementById("assigned");
  let deadlineInput = document.getElementById("deadline-input");
  let description = document.getElementById("description-content");

  output.innerHTML = progress.value + "%";

  progress.oninput = function () {
    output.innerHTML = this.value + "%";
  };

  document.getElementById("AddNew-lightbox").style.zIndex = "100";
  document.getElementById("AddNew-lightbox").style.opacity = "1";

  progress.value = showProgress;
  output.innerHTML = progress.value + "%";
  assigned.value = showAssigned;
  deadlineInput.value = showDeadline;
  description.value = showDescription;
  taskName.value = showTaskName;

  submitAddTask.addEventListener("click", () => {
    if (
      assigned.value === "" ||
      deadlineInput.value === "" ||
      description.value === "" ||
      taskName.value === ""
    ) {
      document.getElementById("add-task-error-message").style.opacity = "1";
      document.getElementById("add-task-error-message").innerText =
        "You need to fill out all fields!";
    } else if (
      JSON.parse(localStorage.getItem(accountIndex)).todolist.length === 8
    ) {
      document.getElementById("add-task-error-message").style.opacity = "1";
      document.getElementById("add-task-error-message").innerText =
        "You reached the task maximum!";
    } else if (taskName.value.length > 8) {
      document.getElementById("add-task-error-message").style.opacity = "1";
      document.getElementById("add-task-error-message").innerText =
        "Task name can't be longer than 8 characters!";
    } else {
      document.getElementById("add-task-error-message").style.opacity = "0";

      let taskInfo = {
        name: taskName.value,
        assignedTo: assigned.value,
        progressPercent: progress.value,
        deadlineDate: deadlineInput.value,
        descriptionContent: description.value,
      };

      if (showTask === false) {
        if (
          JSON.parse(localStorage.getItem(accountIndex)).todolist.length > 0
        ) {
          for (
            let i = 0;
            i < JSON.parse(localStorage.getItem(accountIndex)).todolist.length;
            i++
          ) {
            if (
              JSON.parse(localStorage.getItem(accountIndex)).todolist[i]
                .name === taskName.value
            ) {
              document.getElementById("add-task-error-message").style.opacity =
                "1";

              document.getElementById("add-task-error-message").innerText =
                "That task name already exist!";
              break;
            } else if (
              i ===
              JSON.parse(localStorage.getItem(accountIndex)).todolist.length - 1
            ) {
              todolist.push(taskInfo);

              addTaskToLocalStorage();

              taskInfoHide();
              location.reload();
              break;
            }
          }
        } else {
          todolist.push(taskInfo);

          addTaskToLocalStorage();

          taskInfoHide();
          location.reload();
        }
      } else if (showTask === true) {
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem(accountIndex)).todolist.length;
          i++
        ) {
          if (
            JSON.parse(localStorage.getItem(accountIndex)).todolist[i].name ===
            taskName.value
          ) {
            todolist[i] = taskInfo;
            addTaskToLocalStorage();

            taskInfoHide();
            location.reload();
            break;
          } else if (
            i ===
            JSON.parse(localStorage.getItem(accountIndex)).todolist.length - 1
          ) {
            document.getElementById("add-task-error-message").style.opacity =
              "1";
            document.getElementById("add-task-error-message").innerText =
              "Task name must be same as before!";
            break;
          }
        }
      }
    }
  });

  if (showTask === true) {
    let removeButton = document.createElement("button");
    removeButton.setAttribute("id", "removeTask");
    removeButton.innerHTML = "Remove Task";
    document.querySelector("#done-button").append(removeButton);

    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem(accountIndex)).todolist.length;
      i++
    ) {
      if (
        JSON.parse(localStorage.getItem(accountIndex)).todolist[i].name ===
        taskName.value
      ) {
        let removeTask = document.getElementById("removeTask");
        todolist = JSON.parse(localStorage.getItem(accountIndex)).todolist;

        removeTask.addEventListener("click", () => {
          todolist.splice(i, 1);
          addTaskToLocalStorage();
          location.reload();
        });
        break;
      }
    }
  }
}

function addTaskToLocalStorage() {
  let tempLocal = JSON.parse(localStorage.getItem(accountIndex));

  tempLocal.todolist = todolist;

  localStorage[accountIndex] = JSON.stringify(tempLocal);
}

displayTaskInTaskContainer();

let temp = JSON.parse(localStorage.getItem(accountIndex)).todolist;

for (
  let i = 0;
  i < JSON.parse(localStorage.getItem(accountIndex)).todolist.length;
  i++
) {
  document.getElementById("item" + i).addEventListener("click", () => {
    taskInfoShow(
      temp[i].name,
      temp[i].assignedTo,
      temp[i].progressPercent,
      temp[i].deadlineDate,
      temp[i].descriptionContent,
      true
    );
  });
}

function displayTaskInTaskContainer() {
  let temp = JSON.parse(localStorage.getItem(accountIndex)).todolist;

  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem(accountIndex)).todolist.length;
    i++
  ) {
    todolistItem(
      temp[i].name,
      temp[i].deadlineDate,
      temp[i].progressPercent,
      i
    );
  }
}

function taskInfoHide() {
  document.getElementById("AddNew-lightbox").style.zIndex = "-100";
  document.getElementById("AddNew-lightbox").style.opacity = "0";
}

function todolistItem(
  itemTaskName,
  itemTaskDeadline,
  progressPercentage,
  index
) {
  document.getElementById("todolist").innerHTML +=
    "<button id='item" + index + "' class='taskItem'></button>";

  document.getElementById("item" + index).innerHTML +=
    "<div id='leftSide" + index + "' class='taskItemLeftSide'></div>";

  document.getElementById("item" + index).innerHTML +=
    "<div id='rightSide" + index + "' class='taskItemRightSide'>";

  document.getElementById("leftSide" + index).innerHTML +=
    "<p id='itemTaskName" +
    index +
    "' class='taskItemName'>" +
    itemTaskName +
    "</p>";
  document.getElementById("leftSide" + index).innerHTML +=
    "<p id='itemDeadline" + index + "'>" + itemTaskDeadline + "</p>";

  document.getElementById("item" + index).style.gridArea = "item" + index;

  document.getElementById("rightSide" + index).innerHTML +=
    "<p id='percentage" +
    index +
    "' class='displayPercentage'>" +
    progressPercentage +
    "%" +
    "</p>";

  if (progressPercentage <= 33) {
    document.getElementById("rightSide" + index).style.backgroundColor =
      "#dd5e5e";
  } else if (progressPercentage > 33 && progressPercentage <= 66) {
    document.getElementById("rightSide" + index).style.backgroundColor =
      "#dddb5e";
  } else if (progressPercentage > 66 && progressPercentage <= 100) {
    document.getElementById("rightSide" + index).style.backgroundColor =
      "#5edd69";
  }
}
