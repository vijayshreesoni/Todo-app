// Basic todo app with localStorage and filters
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("todo_tasks") || "[]");
let filter = "all";

/* Utility: save */
function saveTasks(){
  localStorage.setItem("todo_tasks", JSON.stringify(tasks));
}

/* Render tasks according to current filter */
function render(){
  taskList.innerHTML = "";
  const visible = tasks.filter(t => {
    if(filter === "all") return true;
    if(filter === "active") return !t.done;
    return t.done;
  });

  if(visible.length === 0){
    const empty = document.createElement("div");
    empty.style.color = "rgba(255,255,255,0.35)";
    empty.style.textAlign = "center";
    empty.style.padding = "18px 0";
    empty.textContent = "No tasks — add one!";
    taskList.appendChild(empty);
    return;
    
  }

  visible.forEach(task => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " completed" : "");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      render();
    });

    const span = document.createElement("div");
    span.className = "text";
    span.textContent = task.text;

    // edit button
    const editBtn = document.createElement("button");
    editBtn.className = "icon-btn";
    editBtn.title = "Edit";
    editBtn.innerHTML = "✏️";
    editBtn.addEventListener("click", () => startEdit(task.id));

    // delete button
    const delBtn = document.createElement("button");
    delBtn.className = "icon-btn";
    delBtn.title = "Delete";
    delBtn.innerHTML = "🗑️";
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
updateProgress();}

/* Add new task */
function addTask(text){
  const trimmed = text.trim();
  if(!trimmed) return;
  tasks.unshift({
    id: Date.now(),
    text: trimmed,
    done: false
  });
  saveTasks();
  render();
}

/* start editing (replace text with input) */
function startEdit(id){
  const idx = tasks.findIndex(t => t.id === id);
  if(idx === -1) return;
  const li = taskList.querySelector(`li[data-id="${id}"]`);
  if(!li) return;

  // create edit input
  li.innerHTML = "";
  const input = document.createElement("input");
  input.className = "edit-input";
  input.value = tasks[idx].text;
  input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      finishEdit(id, input.value);
    } else if(e.key === "Escape"){
      render();
    }
  });

  const saveBtn = document.createElement("button");
  saveBtn.className = "icon-btn";
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => finishEdit(id, input.value));

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "icon-btn";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => render());

  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);

  input.focus();
  input.select();
}

/* finish edit */
function finishEdit(id, newText){
  const idx = tasks.findIndex(t => t.id === id);
  if(idx === -1) return;
  const trimmed = newText.trim();
  if(!trimmed){
    // if empty after edit, remove
    tasks.splice(idx,1);
  } else {
    tasks[idx].text = trimmed;
  }
  saveTasks();
  render();
}

/* UI wiring */
addBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});
taskInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

/* filter buttons */
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});

/* clear completed */
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
});

/* initial render */
render();
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressText").textContent =
    percent + "% completed";
}
