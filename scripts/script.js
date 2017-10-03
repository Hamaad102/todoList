let todoList = {
  todos: [],
  addTodo(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo(position, todoText){
    this.todos[position].todoText = todoText;
  },
  deleteTodo(position){
    this.todos.splice(position,1);
  },
  toggleCompleted(position){
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll(){
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    this.todos.forEach(function(todo){
      if(todo.completed===true){
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo){
      if(completedTodos===totalTodos){
        todo.completed = false;
      }else{
        todo.completed = true;
      }
    });
  }
};

let handlers = {
  addTodo(e){
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    if(e.keyCode === 13 && addTodoTextInput.value.length>0){
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    }
  },
  changeTodo(position){
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(position, changeTodoTextInput.value);
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted(position){
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll(){
    todoList.toggleAll();
    view.displayTodos();
  }
};


let view = {
  displayTodos(){
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';
      if(todo.completed===true){
        todoTextWithCompletion='(x) '+todo.todoText;
      }else{
        todoTextWithCompletion='() '+todo.todoText;
      }
      todoLi.id = position;
      todosUl.className = 'shadow card-design';
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createEditButton());
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createToggleButton());
      todosUl.appendChild(todoLi);
    }, this);

  },
  createEditButton(){
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    return editButton;
  },
  createToggleButton(){
    let toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Button';
    toggleButton.className = 'toggleButton';
    return toggleButton;
  },
  createDeleteButton(){
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners(){
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click',function(event){
      let elementClicked = event.target;
      if(elementClicked.className === 'deleteButton'){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }else if(elementClicked.className === "editButton"){
        handlers.changeTodo(parseInt(elementClicked.parentNode.id));
      }else if(elementClicked.className ==='toggleButton'){
        console.log(elementClicked.parentNode);
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
