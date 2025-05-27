const taskForm = document.getElementById("task-form");
const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const editPopup = document.getElementById("edit-popup");
const editInput = document.getElementById("edit-input");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

let currentEditLi = null;

document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTasksToStorage();
    newTaskInput.value = "";
  }
});

function addTask(text, completed = false) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text ${completed ? "completed" : ""}">${text}</span>
    <div class="task-buttons">
      <button onclick="toggleComplete(this)" title="Mark as complete">✔</button>
      <button onclick="editTask(this)" title="Edit task">✏️</button>
      <button onclick="deleteTask(this)" title="Delete task">🗑</button>
    </div>
  `;
  taskList.appendChild(li);
}

function toggleComplete(button) {
  const span = button.closest("li").querySelector(".task-text");
  span.classList.toggle("completed");
  saveTasksToStorage();
}

function deleteTask(button) {
  if (confirm("Are you sure you want to delete this task?")) {
    const li = button.closest("li");
    taskList.removeChild(li);
    saveTasksToStorage();
  }
}

function editTask(button) {
  currentEditLi = button.closest("li");
  const taskText = currentEditLi.querySelector(".task-text").textContent;
  editInput.value = taskText;
  editPopup.classList.remove("hidden");
  editInput.focus();
}

saveEditBtn.addEventListener("click", () => {
  if (currentEditLi && editInput.value.trim()) {
    currentEditLi.querySelector(".task-text").textContent = editInput.value.trim();
    editPopup.classList.add("hidden");
    editInput.value = "";
    saveTasksToStorage();
  }
});

cancelEditBtn.addEventListener("click", () => {
  editInput.value = "";
  editPopup.classList.add("hidden");
  currentEditLi = null;
});

editInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveEditBtn.click();
  }
});

function saveTasksToStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.querySelector(".task-text").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  tasks.forEach((task) => addTask(task.text, task.completed));
}
