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