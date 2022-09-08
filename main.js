let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// click on task element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button 
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    // remove from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done")
    refreshLocalStorage(e.target.getAttribute("data-id"))
  }
})


// Trigger Get Data From Local Storage Function
getDataFromLocalStorage()

// Add Task
submit.onclick = function () {
    if (input.value !== "") {
      addTaskToArray(input.value); // Add Task To Array Of Tasks
      input.value = ""; // Empty Input Field
    }
  };

  function addTaskToArray(taskText) {
    // Task Data
    const task = {
      id: Date.now(),
      title: taskText,
      completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);

    //div 
    addElementsToPageFrom(arrayOfTasks)

    //data
    addDataToLocalStorage(arrayOfTasks)
}


function addElementsToPageFrom(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach ( (task) => {
        // create div element
    let div = document.createElement("div")
    div.className = "task"
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title))
    //check if the task completed
    if (task.completed === true) {
        div.className = "task done"
    }
    //create delete button
    let span = document.createElement("span")
    span.className = "del"
    span.appendChild(document.createTextNode("Delete"))
    //append button to main div
    div.appendChild(span)
    tasksDiv.appendChild(div)
    });
}

function addDataToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }
  function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addElementsToPageFrom(tasks);
    }
  }
  function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter( (task) => task.id != taskId)
    addDataToLocalStorage(arrayOfTasks);
  }
function refreshLocalStorage(taskId) {
  for (let i = 0 ; i < arrayOfTasks.length ; i++)  {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
    }
  }
  addDataToLocalStorage(arrayOfTasks)
}
