const taskForm = document.getElementById("task-form");
const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const editPopup = document.getElementById("edit-popup");
const editInput = document.getElementById("edit-input");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

let currentEditLi = null;

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    newTaskInput.value = "";
  }
});

function addTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${text}</span>
    <div class="task-buttons">
      <button onclick="toggleComplete(this)">✔</button>
      <button onclick="editTask(this)">✏</button>
      <button onclick="deleteTask(this)">🗑</button>
    </div>
  `;
  taskList.appendChild(li);
}

function toggleComplete(button) {
  const span = button.closest("li").querySelector(".task-text");
  span.classList.toggle("completed");
}

function deleteTask(button) {
  const li = button.closest("li");
  taskList.removeChild(li);
}

function editTask(button) {
  currentEditLi = button.closest("li");
  const taskText = currentEditLi.querySelector(".task-text").textContent;
  editInput.value = taskText;
  editPopup.classList.remove("hidden");
  editInput.focus();
}

saveEditBtn.addEventListener("click", () => 
  {
    if (currentEditLi && editInput.value.trim()) {
      currentEditLi.querySelector(".task-text").textContent = editInput.value.trim();
      editPopup.classList.add("hidden");
    }
  }
);

cancelEditBtn.addEventListener("click", () => 
  {
    editPopup.classList.add("hidden");
    currentEditLi = null;
  }
);

