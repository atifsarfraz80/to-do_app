export class Todo{
    constructor(name , description , dueDate , priority , notes="" , checklist=[] , iscomplete=false){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.iscomplete = iscomplete;
    }

    toggleCompletion(){
        this.iscomplete = !this.iscomplete;
    }

    updatePriority(newPriority){
        this.priority = newPriority;
    }

    editDetails(name , description , dueDate , notes , checklist){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.notes = notes;
        this.checklist = checklist;
    }

}