export class Project{
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.toDos= [];
    }

    addTodo(list){
        this.toDos.push(list);
    }
    removeTodo(index) {
    if (index >= 0 && index < this.toDos.length) {
        this.toDos.splice(index, 1);
        return true;
    }
    return false;
}
    getTodos (){
        this.toDos.forEach((list) =>{
            console.log(list);
        })
    }
}