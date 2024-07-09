const myform = document.getElementById("myform");
const mylist = document.getElementById("mylist");
const myinput = document.getElementById("myinput");

// Retrieve tasks from localStorage if available
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to create a task
const createit = (taskObj) => {
    const { task, checked } = taskObj;
    const temp = `<li><input type="checkbox" ${checked ? 'checked' : ''}> ${task}<button onclick="deleteit(this)">delete</button><hr/></li>`;
    mylist.insertAdjacentHTML("beforeend", temp);
};

// Function to delete a task
const deleteit = (x) => {
    const taskToDelete = x.parentElement.textContent.trim().split("delete")[0].trim();
    savedTasks = savedTasks.filter(task => task.task !== taskToDelete);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    renderTasks(); // Render tasks after deletion
};

// Function to render tasks
const renderTasks = () => {
    mylist.innerHTML = "";
    savedTasks.forEach(task => createit(task));
};

// Render tasks on page load
renderTasks();

// Event listener for form submission
myform.addEventListener("submit", (data) => {
    data.preventDefault();
    const newTask = myinput.value.trim();
    if (newTask !== "") {
        savedTasks.push({ task: newTask, checked: false });
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        createit({ task: newTask, checked: false });
        myinput.value = "";
    }
});

// Event listener for checkbox change
mylist.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
        const taskToUpdate = event.target.parentElement.textContent.trim().split("delete")[0].trim();
        savedTasks.forEach(task => {
            if (task.task === taskToUpdate) {
                task.checked = event.target.checked;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
});
