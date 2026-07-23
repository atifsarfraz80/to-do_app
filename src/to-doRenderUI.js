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
        if(task.priority.toLowerCase() === "high") myPriority.classList.add("red");
        if(task.priority.toLowerCase() === "moderate") myPriority.classList.add("grey");
        if(task.priority.toLowerCase() === "low") myPriority.classList.add("yellow");

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

    // 4. Handle Cancel Button
    subtaskCancelBtn.onclick = () => {
        subtaskForm.reset();
        subtaskModal.close();
    };
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
                <div class="check-group">
                    <input type="checkbox" class="task-checkbox" ${task.iscomplete ? "checked" : ""}>
                    <button class="taskName-btn">${task.name}</button>
                </div>
            `;

            const btn = div.querySelector(".taskName-btn");
            btn.addEventListener("click", () => {
                renderTaskDetails(task);
            });

            const checkbox = div.querySelector(".task-checkbox");
            checkbox.addEventListener("change", () => {
                task.toggleCompletion();
            });

            taskDiv.appendChild(div);


            if (index === 0) {
                renderTaskDetails(task);
            }
        });

        section.appendChild(taskDiv);
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