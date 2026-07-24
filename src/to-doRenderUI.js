import { Todo } from "./to-do.js";

export function todoUI(app) {
    const todo_form = document.querySelector("#todo-form");
    const todoDialog = document.querySelector("#todo-modal");

    const renderTaskDetails = (task) => {
        const section = document.querySelector("#todo-container");
        if (!section || !task) return;

        const existingDetails = document.querySelector(".task-details-panel");
        if (existingDetails) {
            existingDetails.remove();
        }

        if (!task.checklist) {
            task.checklist = [];
        }

        const container = document.createElement("div");
        container.classList.add("task-details-panel");

        container.innerHTML = `
            <div class="details details-title-div">
                <h2>${task.name}</h2>
            </div>
            <div class="details">
                <h3>Description:</h3>
                <p>${task.description || "No description provided."}</p>
            </div>
            <div class="details">
                <h3>Due Date:</h3>
                <p>${task.dueDate || "No due date"}</p>
            </div>
            <div class="details">
                <h3>Priority:</h3>
                <p class="prior">${task.priority.toUpperCase()}</p>
            </div>
            <div class="details">
                <h3>Notes:</h3>
                <p>${task.notes || "None"}</p>
            </div>
            <div class="details">
                <h3>SubTasks:</h3>
                <div id="subtasks-list"></div>
            </div>
            <div class="details">
                <button id="add-subtask-btn" class="btn btn-secondary">+ Add Sub-Task</button>
            </div>
        `;

        const myPriority = container.querySelector(".prior");
        const priorityLower = task.priority.toLowerCase();
        if (priorityLower === "high") myPriority.classList.add("red");
        if (priorityLower === "moderate") myPriority.classList.add("grey");
        if (priorityLower === "low") myPriority.classList.add("yellow");

        const subtasksList = container.querySelector("#subtasks-list");
        task.checklist.forEach((subtask) => {
            const content = document.createElement("div");
            content.classList.add("subtask-div");
            
            content.innerHTML = `
                <input type="checkbox" class="subtask-checkbox" ${subtask.completed ? "checked" : ""}>
                <span class="subtask-title ${subtask.completed ? "checked" : ""}">${subtask.title}</span>
            `;

            const checkbox = content.querySelector(".subtask-checkbox");
            const title = content.querySelector(".subtask-title");

            checkbox.addEventListener("change", () => {
                subtask.completed = checkbox.checked;
                title.classList.toggle("checked", subtask.completed);
            });

            subtasksList.appendChild(content);
        });

        section.appendChild(container);

        const addSubtaskBtn = container.querySelector("#add-subtask-btn");
        const subtaskModal = document.querySelector("#subtask-modal");
        const subtaskForm = document.querySelector("#subtask-form");
        const subtaskCancelBtn = subtaskModal.querySelector(".subtask-cancel-button");

        addSubtaskBtn.addEventListener("click", () => {
            subtaskModal.showModal();
        });

        subtaskForm.onsubmit = (e) => {
            e.preventDefault();
            const subtaskInput = document.querySelector("#subtask-name");
            const subtaskName = subtaskInput.value.trim();

            if (subtaskName) {
                task.checklist.push({ title: subtaskName, completed: false });
                renderTaskDetails(task); 
            }

            subtaskForm.reset();
            subtaskModal.close();
        };

        subtaskCancelBtn.onclick = () => {
            subtaskForm.reset();
            subtaskModal.close();
        };

        if (task.iscomplete) {
            if (addSubtaskBtn) {
                addSubtaskBtn.disabled = true;
                addSubtaskBtn.style.opacity = "0.5";
                addSubtaskBtn.style.cursor = "not-allowed";
            }

            const subtaskCheckboxes = container.querySelectorAll(".subtask-checkbox");
            subtaskCheckboxes.forEach((cb) => {
                cb.disabled = true;
            });
        }
    };

    const renderTaskList = () => {
        const section = document.querySelector("#todo-container");
        section.innerHTML = "";

        const project = app.getActiveProject();
        if (!project) return;

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-list-panel");

        const heading = document.createElement("div");
        heading.classList.add("task-list-heading");
        heading.textContent = "Your Tasks";
        taskDiv.appendChild(heading);

        project.toDos.forEach((task, index) => {
            const div = document.createElement("div");
            div.classList.add("task-item");

            div.innerHTML = `
                <div class = "single-task">
                    <div class="check-group">
                        <input type="checkbox" class="task-checkbox" ${task.iscomplete ? "checked" : ""}>
                        <button class="taskName-btn ${task.iscomplete ? "checked" : ""}">${task.name}</button>
                    </div>
                    <div class="button-to-edit">
                        <button class="edit-btn ">Edit Task</button>
                    </div>
                </div>
            `;

            const taskcheckbox = div.querySelector(".task-checkbox");
            const taskNameButton = div.querySelector(".taskName-btn");

            taskcheckbox.addEventListener("change", () => {
                task.toggleCompletion();
                taskNameButton.classList.toggle("checked", task.iscomplete);
                renderTaskDetails(task); 
            });

            taskNameButton.addEventListener("click", () => {
                renderTaskDetails(task);
            });

            taskDiv.appendChild(div);

        });

        section.appendChild(taskDiv);

        if (project.toDos.length > 0) {
        renderTaskDetails(project.toDos[0]);
        }
    };

    if (!todo_form.dataset.listenerAttached) {
        todo_form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.querySelector("#todo-name-id").value;
            const description = document.querySelector("#description").value;
            const dueDate = document.querySelector("#date").value;
            const priority = document.querySelector("#priority").value;
            const notes = document.querySelector("#notes").value;

            if (name) {
                const activeProject = app.getActiveProject();
                const newTodo = new Todo(name, description, dueDate, priority, notes);
                activeProject.addTodo(newTodo);

                renderTaskList();
                renderTaskDetails(newTodo);
            }

            todo_form.reset();
            todoDialog.close();
        });
        todo_form.dataset.listenerAttached = "true";
    }

    renderTaskList();
}