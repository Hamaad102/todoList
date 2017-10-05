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

let initialVal;

let handlers = {
  addTodo(e){
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    if(e.keyCode === 13 && addTodoTextInput.value.length>0){
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    }
  },
  changeTodo(position, content){
    todoList.todos[position] = initialVal;
    todoList.todos[position].todoText = content;
    view.displayTodos();
    // let initialValue = todoList.todos[position].todoText;
    // content.innerHTML = '<input id="temp" onkeypress="this.pushEditTodo(event)">';
    // document.getElementById('temp').value = initialValue;
    // document.getElementById('temp').value = initialValue;
    //
    //
    // let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    // todoList.changeTodo(position, changeTodoTextInput.value);
    // changeTodoTextInput.value = '';
    // view.displayTodos();
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

let edit = false;

let view = {
  displayTodos(){
    let todosUl = document.querySelector('ul');
    let complete = document.createElement('i');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';
      if(todo.completed===true){
        todoTextWithCompletion= '<i class="fa fa-check-circle-o"></i> '+ todo.todoText;
      }else{
        todoTextWithCompletion='<i class="fa fa-circle-o"></i> '+todo.todoText;
      }
      todoLi.id = position;
      todosUl.className = 'shadow card-design';
      todoLi.innerHTML = todoTextWithCompletion;
      todoLi.appendChild(this.createEditButton());
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createEditButton(){
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    return editButton;
  },
  createDeleteButton(){
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners(){
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click',function(event){
      let elementClicked = event.target;
      if(elementClicked.className === 'deleteButton'){
        if(todoList.todos.length === 1){
          document.querySelector('ul').classList.remove("shadow");
        }
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }else if(elementClicked.className === "editButton"){
        initialVal = todoList.todos[parseInt(elementClicked.parentNode.id)];
        let initialValue = todoList.todos[parseInt(elementClicked.parentNode.id)].todoText;
        elementClicked.parentNode.innerHTML = '<input id="temp">';
        document.getElementById('temp').value = initialValue;
        edit = true;
      }else if(elementClicked.className === 'fa fa-circle-o' || elementClicked.className === "fa fa-check-circle-o"){
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }else if(edit===true){
        let temp = document.getElementById('temp');
        temp.addEventListener('keydown', function(event){
          if(event.keyCode === 13 && document.getElementById('temp').value.length>0){
            handlers.changeTodo(parseInt(elementClicked.parentNode.id), temp.value);
          }
        });
      }
    });
  }
};

view.setUpEventListeners();
