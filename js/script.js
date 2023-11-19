// Retrieve tasks from local storage
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
var completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
// Select elements
var taskForm = document.querySelector("form");
var taskList = document.getElementById("taskList");
var completedTasksList = document.getElementById("completedTasks");
// Render tasks on page
function renderTasks(taskArray) {
    taskList.innerHTML = "";
    var _loop_1 = function (i) {
        var task = taskArray[i];
        var listItem = document.createElement("li");
        var checkbox = document.createElement("input");
        var span = document.createElement("span");
        var button = document.createElement("button");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        span.innerText = task.name;
        button.innerText = "Delete";
        button.addEventListener("click", function () { return deleteTask(i, taskArray); });
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(button);
        if (task.date) {
            var date = document.createElement("span");
            date.innerText = " (".concat(task.date, ")");
            listItem.appendChild(date);
        }
        taskList.appendChild(listItem);
    };
    for (var i = 0; i < taskArray.length; i++) {
        _loop_1(i);
    }
}
// Render completed tasks on page
function renderCompletedTasks() {
    completedTasksList.innerHTML = "";
    for (var i = 0; i < completedTasks.length; i++) {
        var task = completedTasks[i];
        var listItem = document.createElement("li");
        var span = document.createElement("span");
        span.innerText = task.name;
        listItem.appendChild(span);
        if (task.date) {
            var date = document.createElement("span");
            date.innerText = " (".concat(task.date, ")");
            listItem.appendChild(date);
        }
        completedTasksList.appendChild(listItem);
    }
}
// Add task
function addTask(event) {
    event.preventDefault();
    var nameInput = document.getElementById("task");
    var dateInput = document.getElementById("date");
    var name = nameInput.value;
    var date = dateInput.value;
    tasks.push({ name: name, date: date, completed: false });
    renderTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    nameInput.value = "";
    dateInput.value = "";
}
// Delete task
function deleteTask(index, taskArray) {
    taskArray.splice(index, 1);
    renderTasks(taskArray);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
taskList.addEventListener("change", function (event) {
    var _a, _b;
    if (event.target.type === "checkbox") {
        var index = Array.from(((_b = (_a = event.target.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.children) || []).indexOf(event.target.parentNode);
        tasks[index].completed = event.target.checked;
        if (event.target.checked) {
            var completedTask = tasks.splice(index, 1)[0];
            completedTasks.push(completedTask);
        }
        else {
            var uncompletedTask = completedTasks.splice(index, 1)[0];
            tasks.push(uncompletedTask);
        }
        renderTasks(tasks);
        renderCompletedTasks();
        updateLocalStorage();
    }
});
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
// ... (rest of the code remains unchanged)
// Load tasks on page load
renderTasks(tasks);
renderCompletedTasks();
// Add task event listener
taskForm.addEventListener("submit", addTask);
// ... (rest of the code remains unchanged)
