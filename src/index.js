import "./style.css";
import { Todo } from "./to-do.js";
import { manager } from "./manager.js";
import { projectUI } from "./projectRenderUI.js";
import { todoUI } from "./to-doRenderUI.js";


const app = new manager();

projectUI(app);
todoUI(app);


const addTask = document.querySelector("#add-todo-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const dialog = document.querySelector(".modal");
const addTaskForm = document.querySelector(".form");

addTask.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
    addTaskForm.reset();
});


const addProject = document.querySelector("#add-project-btn");
const cancelButton = document.querySelector(".cancel-button");
const projectDialog = document.querySelector(".modal-project");
const projectForm = document.querySelector("#project-form");

addProject.addEventListener("click", () => {
    projectDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    projectDialog.close();
    projectForm.reset();
});

const deleteBtn = document.querySelector("#delete-project-btn");

deleteBtn.addEventListener("click" , (e)=>{
    const projectToRemove = app.getActiveProject();

    if (!projectToRemove || projectToRemove.name.toLowerCase() === "default") return;
    const confirmDelete = confirm(`Are you sure you want to delete "${projectToRemove.name}"?`);
    
    if (confirmDelete) {
        app.deleteProject(projectToRemove.name); 
        
        projectUI(app);
        todoUI(app);
    }
});

const TaskeditBtn = document.querySelector(".edit-btn");

TaskeditBtn.addEventListener("click" , ()=>{

})

