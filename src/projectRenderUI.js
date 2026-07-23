import { todoUI } from "./to-doRenderUI.js";
export function projectUI(app){
    const project_form = document.querySelector("#project-form");
    const projectDialog = document.querySelector(".modal-project");
    const projectNameInput = document.querySelector("#project-name-input");

    const renderMainTitle = () => {
    const titleElement = document.querySelector("#current-project-title");
    if (titleElement && app.getActiveProject()) {
        titleElement.textContent = app.getActiveProject().name;
    }
};

    const renderSidebar = ()=>{
        const nav = document.querySelector(".project-list");
        nav.innerHTML = "";
        app.getAllProjects().forEach((project) => {
           const div = document.createElement("div");
            div.classList.add("project-div");

            const btn = document.createElement("button");
            btn.classList.add("pBtn");
            btn.classList.add("projectName-btn");

            btn.textContent = project.name;

            if(app.getActiveProject() === project)
            {
                btn.classList.add("active");
            }

            btn.addEventListener("click", () => {
                app.setActiveProject(project.name);
                renderSidebar();
                todoUI(app);
                renderMainTitle();
            });

            div.appendChild(btn);
            nav.appendChild(div); 
        });
        renderMainTitle();
    };
    project_form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#project-name-id").value;
        if (name) {
            app.createProject(name);
            app.setActiveProject(name);
            renderSidebar();
        }
        project_form.reset();
        projectDialog.close();
    });

    renderSidebar();
}