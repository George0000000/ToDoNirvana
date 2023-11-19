interface Task {
    name: string;
    date?: string;
    completed: boolean;
}

// Retrieve tasks from local storage
let tasks: Task[] = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks: Task[] = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Select elements
const taskForm = document.querySelector("form") as HTMLFormElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const completedTasksList = document.getElementById("completedTasks") as HTMLUListElement;

// Render tasks on page
function renderTasks(taskArray: Task[]) {
    taskList.innerHTML = "";
    for (let i = 0; i < taskArray.length; i++) {
        const task = taskArray[i];
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const button = document.createElement("button");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        span.innerText = task.name;
        button.innerText = "Delete";
        button.addEventListener("click", () => deleteTask(i, taskArray));
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(button);
        if (task.date) {
            const date = document.createElement("span");
            date.innerText = ` (${task.date})`;
            listItem.appendChild(date);
        }
        taskList.appendChild(listItem);
    }
}

// Render completed tasks on page
function renderCompletedTasks() {
    completedTasksList.innerHTML = "";
    for (let i = 0; i < completedTasks.length; i++) {
        const task = completedTasks[i];
        const listItem = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = task.name;
        listItem.appendChild(span);
        if (task.date) {
            const date = document.createElement("span");
            date.innerText = ` (${task.date})`;
            listItem.appendChild(date);
        }
        completedTasksList.appendChild(listItem);
    }
}

// Add task
function addTask(event: Event) {
    event.preventDefault();
    const nameInput = document.getElementById("task") as HTMLInputElement;
    const dateInput = document.getElementById("date") as HTMLInputElement;
    const name = nameInput.value;
    const date = dateInput.value;
    tasks.push({ name, date, completed: false });
    renderTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    nameInput.value = "";
    dateInput.value = "";
}

// Delete task
function deleteTask(index: number, taskArray: Task[]) {
    taskArray.splice(index, 1);
    renderTasks(taskArray);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskList.addEventListener("change", (event) => {
    if ((event.target as HTMLInputElement).type === "checkbox") {
        const index = Array.from((event.target as HTMLElement).parentNode?.parentNode?.children || []).indexOf((event.target as HTMLElement).parentNode as HTMLElement);
        tasks[index].completed = (event.target as HTMLInputElement).checked;
        if ((event.target as HTMLInputElement).checked) {
            const completedTask = tasks.splice(index, 1)[0];
            completedTasks.push(completedTask);
        } else {
            const uncompletedTask = completedTasks.splice(index, 1)[0];
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
