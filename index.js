document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.title, task.summary, task.category, task.completed));
}

function saveTasks() {
    const tasks = Array.from(document.getElementById("task-list").children).map(card => ({
        title: card.dataset.title,
        summary: card.dataset.summary,
        category: card.dataset.category,
        completed: card.classList.contains("completed")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskTitle, taskSummary, category, completed = false) {
    const taskList = document.getElementById("task-list");
    const card = document.createElement("div");
    card.classList.add("task-card");
    if (completed) card.classList.add("completed");
    card.dataset.title = taskTitle;
    card.dataset.summary = taskSummary;
    card.dataset.category = category;
    card.innerHTML = `<strong>${taskTitle}</strong>
                      <p>${taskSummary}</p>
                      <small>(${category})</small> 
                      <button onclick="editTask(this)">Edit</button> 
                      <button onclick="removeTask(this)">X</button>`;
    card.addEventListener("click", function() {
        this.classList.toggle("completed");
        saveTasks();
    });
    taskList.appendChild(card);
    saveTasks();
}

function addTask() {
    const taskTitle = document.getElementById("task-title").value.trim();
    const taskSummary = document.getElementById("task-summary").value.trim();
    const taskCategory = document.getElementById("task-category").value;
    if (taskTitle === "" || taskSummary === "") return;
    createTaskElement(taskTitle, taskSummary, taskCategory);
    document.getElementById("task-title").value = "";
    document.getElementById("task-summary").value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function editTask(button) {
    const card = button.parentElement;
    const newTitle = prompt("Edit Task Title:", card.dataset.title);
    const newSummary = prompt("Edit Task Summary:", card.dataset.summary);
    if (newTitle && newSummary) {
        card.dataset.title = newTitle;
        card.dataset.summary = newSummary;
        card.innerHTML = `<strong>${newTitle}</strong>
                          <p>${newSummary}</p>
                          <small>(${card.dataset.category})</small> 
                          <button onclick="editTask(this)">Edit</button> 
                          <button onclick="removeTask(this)">X</button>`;
        saveTasks();
    }
}

loadTasks();


