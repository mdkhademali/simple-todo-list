const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const profileSection = document.getElementById("profileSection");
let selectedCategory = null;

const now = new Date();
taskDate.value = now.toISOString().split('T')[0];
taskTime.value = now.toTimeString().substring(0, 5);

function toggleProfile() {
  profileSection.style.display = profileSection.style.display === "flex" ? "none" : "flex";
}

function selectCategory(category) {
  document.querySelectorAll(".category").forEach((cat) => cat.classList.remove("active"));
  const activeCategory = Array.from(document.querySelectorAll(".category")).find(cat => cat.textContent === category);
  if (activeCategory) activeCategory.classList.add("active");
  selectedCategory = category;
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const dueDate = taskDate.value;
  const dueTime = taskTime.value;

  if (!taskText) return;

  const task = document.createElement("div");
  task.className = "task";
  task.innerHTML = `
    <div class="text">
      <input type="checkbox" onclick="toggleComplete(this)" />
      <span contenteditable="true">${taskText}${selectedCategory ? ` (${selectedCategory})` : ""}</span>
      ${dueDate ? `<span>Due: ${dueDate}${dueTime ? ` at ${dueTime}` : ""}</span>` : ""}
    </div>
    <button onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></button>
    <button onclick="editTask(this)"><i class="fas fa-edit"></i></button>
    <div class="task-description">
      <textarea placeholder="Add a description..."></textarea>
    </div>
  `;
  taskList.appendChild(task);

  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
  selectedCategory = null;
  document.querySelectorAll(".category").forEach((cat) => cat.classList.remove("active"));
});

function deleteTask(button) {
  const task = button.closest(".task");
  task.remove();
}

function editTask(button) {
  const task = button.closest(".task");
  const textElement = task.querySelector(".text span");
  textElement.contentEditable = true;
  textElement.focus();
}

function toggleComplete(checkbox) {
  const task = checkbox.closest(".task");
  task.classList.toggle("completed");
}