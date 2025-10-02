// Update API URL to match backend
const API_URL = "http://localhost:8081";

// Get token from localStorage (after login)
const token = localStorage.getItem("token");

// Load todos when page loads
document.addEventListener("DOMContentLoaded", loadTodos);

function handleRegister() {
    const form = document.getElementById("registerForm");
    if (!form) return; // Only run if on register.html

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                alert("Registration successful! Please login.");
                window.location.href = "login.html";
            } else {
                alert("Registration failed.");
            }
        } catch (err) {
            console.error("Register error:", err);
            alert("Something went wrong.");
        }
    });
}

// ---------- LOGIN ----------
function handleLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return; // Only run if on login.html

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                alert("Invalid login credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong.");
        }
    });
}
// Fetch and display all todos
async function loadTodos() {
    try {
        const response = await fetch(`${API_URL}/todo`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to fetch todos");

        const todos = await response.json();
        const listDiv = document.getElementById("todo-list");
        listDiv.innerHTML = "";

        if (!todos || todos.length === 0) {
            listDiv.innerHTML = `<p>No Todos yet. Add one!</p>`;
            return;
        }

        todos.forEach(todo => {
            const div = document.createElement("div");
            div.style.marginBottom = "10px";

            // Create checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.isCompleted;
            checkbox.style.marginRight = "10px";

            // Create label for text
            const label = document.createElement("label");
            label.textContent = `${todo.title} - ${todo.description}`;
            if (todo.isCompleted) label.style.textDecoration = "line-through";

            // Event listener for checkbox
            checkbox.addEventListener("change", async () => {
                try {
                    const updatedTodo = {
                        id: todo.id,
                        title: todo.title,
                        description: todo.description,
                        isCompleted: checkbox.checked
                    };

                    await fetch(`${API_URL}/todo/${todo.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedTodo)
                    });

                    // Update strike-through without reloading
                    label.style.textDecoration = checkbox.checked ? "line-through" : "none";
                } catch (err) {
                    console.error("Error updating todo:", err);
                }
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(deleteBtn);
            listDiv.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading todos:", error);
    }
}


// Add new todo
async function addTodo(event) {
    event.preventDefault();

    const title = document.getElementById("task").value.trim();
    const description = document.getElementById("desc").value.trim();

    if (!title || !description) {
        alert("Please fill both Title and Description");
        return;
    }

    const todo = {
        title: title,
        description: description,
        isCompleted: false
    };

    try {
        await fetch(`${API_URL}/todo/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(todo)
        });

        document.getElementById("task").value = "";
        document.getElementById("desc").value = "";

        loadTodos();
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

// Delete todo
async function deleteTodo(id) {
    try {
        await fetch(`${API_URL}/todo/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        loadTodos();
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}

// Toggle todo completion
async function toggleTodo(id, isCompleted) {
    try {
        // Fetch existing todo
        const res = await fetch(`${API_URL}/todo/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const existing = await res.json();

        const updatedTodo = {
            id: id,
            title: existing.title,
            description: existing.description,
            isCompleted: !isCompleted
        };

        await fetch(`${API_URL}/todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedTodo)
        });

        loadTodos();
    } catch (error) {
        console.error("Error toggling todo:", error);
    }
}
// ✅ Attach handlers when script loads
handleRegister();
handleLogin();
