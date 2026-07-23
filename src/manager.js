import { Project } from "./project.js";
export class manager{
    constructor(){
        this.projects = [];
        this.activeProject = null;

        this.init();
    }

    init(){
        const defaultProject = this.createProject("Default");
        this.setActiveProject(defaultProject.name);
    }

    createProject(name) {
        const existing = this.projects.find(
            (p) => p.name.toLowerCase() === name.toLowerCase()
        );
        if (existing) return existing;

        const newProject = new Project(name);
        this.projects.push(newProject);
        return newProject;
    }

    setActiveProject(identifier) {
        const project = this.projects.find(
            (p) => p.id === identifier || p.name.toLowerCase() === identifier.toLowerCase());
        if (project) {
            this.activeProject = project;
            return true;
        }
        return false;
    }

    getActiveProject() {
        return this.activeProject;
    }

    deleteProject (identifier){
        const projectToDelete = this.projects.find(
            (p) => p.id === identifier || p.name.toLowerCase() === identifier.toLowerCase());
        if (!projectToDelete || projectToDelete.name.toLowerCase() === "default") {
            return false; 
        }

        this.projects = this.projects.filter((p) => p !== projectToDelete);

        if (this.activeProject === projectToDelete) {
            this.setActiveProject("Default");
        }

        return true;
    }

    getAllProjects() {
        return this.projects;
    }
}