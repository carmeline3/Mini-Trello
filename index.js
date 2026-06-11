// let tasks = [];


// function displayTasks() {
//   let html = "";
//   for (let i = 0; i < tasks.length; i++) {
//     html += "<li>" + tasks[i] +  " <button onclick='removeTask(" + i + ")';> Delete</button></li>";
//   }
//   document.getElementById("list").innerHTML = html;
// }


// function addTask() {
//   let taskInput = document.getElementById("task");
//   let text = taskInput.value;
//   if (text === "") {
//     return;
//   }
//   tasks.push(text);
//   taskInput.value = "";
//   saveTasks();
//   displayTasks();
// }


// function removeTask(i) {
//   tasks.splice(i, 1);
//   saveTasks();
//   displayTasks();
// }


// function clearAll() {
//   tasks = [];
//   saveTasks();
//   displayTasks();
// }


// function saveTasks() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// function loadTasks() {
//   let saved = localStorage.getItem("tasks");
//   if (saved !== null) {
//     tasks = JSON.parse(saved);
//   }
// }


// loadTasks();
// displayTasks();


class Task {

    constructor(title, label) {
       this.id = Date.now();
        this.title = title;
        this.label = label;
        this.status = "todo";

    }

}

let tasks = [];



function addTask() {
    let title = taskInput.value;
    if (title === "") {
        alert("Please enter a task.");
        return;
    }

    else if(dueDate === ""){
     alert("Please enter a date");
        return;
    }


    let task = new Task( title,labelInput.value);
    tasks.push(task);
    taskInput.value = "";


    saveTasks();
    displayTasks();
}


function displayTasks() {

    todo.innerHTML = "";
    doing.innerHTML = "";
    done.innerHTML = "";

    tasks.forEach(task => {

        let color;

        if (task.label === "Studies") {
            color = "pink";
        }
         else if (task.label === "Client Work") {
            color = "green";
        } 
        else if(task.label==="Personal Work"){
            color="black";
        }
        else {
            color = "purple";
        }

        let card = `
            <div class="card">
                <p>${task.title}</p>

                <span
                    class="label"
                    style="background:${color}">
                    ${task.label}
                </span>
                <br>
                <button class="move-button" onclick="moveTask(${task.id})"> Move</button>
                <button class="edit-button" onclick="editTask(${task.id})"> Edit</button>
                <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if (task.status === "todo") {
            todo.innerHTML += card;
        } 
        else if (task.status === "doing") {
            doing.innerHTML += card;
        }
         else {
            done.innerHTML += card
        }

    });

}

function moveTask(id) {

    let task = tasks.find(function(task) {
        return task.id === id;
    });

    if (task.status === "todo") {
        task.status = "doing";
    }
    else if (task.status === "doing") {
        task.status = "done";
    }

    saveTasks();
    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}


function saveTasks() {

    localStorage.setItem(
        "tasks", JSON.stringify(tasks)
    );
}

function loadTasks() {
    const saved =
        localStorage.getItem("tasks");

    if (saved) {
        tasks =JSON.parse(saved);
    }
}

loadTasks();
displayTasks();

function editTask(id) {
    const task = tasks.find(function(task) {
        return task.id === id;
    });

    let newTitle = prompt("Edit Task", task.title);
    if (!newTitle) return;
    task.title = newTitle;

    saveTasks();
    displayTasks();
}