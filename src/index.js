import "./style.css";
import {Project} from "./project.js";
import {Todo} from "./to-do.js";
import {manager} from "./manager.js";

const app = new manager();

console.log("Active Project:", app.getActiveProject().name);

const Myproject = app.createProject("Atif's Project");
console.log(app.setActiveProject("Atif's Project"));

const activeProj = app.getActiveProject();

console.log("Active Project now:", app.getActiveProject().name);

const task = new Todo("Submit Assignment", "Operating Systems", "2026-07-30", "High");

activeProj.addTodo(task);

console.log(app.getAllProjects());

console.log(activeProj.getTodos());


const addTask = document.querySelector("#add-todo-btn");
const cancelBtn = document.querySelector(".cancel-btn")
const dialog = document.querySelector(".modal");
const addTaskForm = document.querySelector(".form");

addTask.addEventListener("click",()=>{
    dialog.showModal();
});

cancelBtn.addEventListener("click",()=>{
    dialog.close();
    addTaskForm.reset(); 
});

const addProject = document.querySelector("#add-project-btn");
const cancelButton = document.querySelector(".cancel-button")
const projectDialog = document.querySelector(".modal-project");
const projectForm = document.querySelector("#project-form");

addProject.addEventListener("click",()=>{
    projectDialog.showModal();
});

cancelButton.addEventListener("click",()=>{
    projectDialog.close();
    projectForm.reset(); 
});
