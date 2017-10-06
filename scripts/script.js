let initialVal;
let timer;
let editingInProgress = false;
let preEdit = false;
let edit = false;

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
      editingInProgress = false;
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    }
  },
  changeTodo(position, content){
    editingInProgress = false;
    todoList.todos[position] = initialVal;
    todoList.todos[position].todoText = content;
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
    editingInProgress = false;
    todoList.toggleAll();
    view.displayTodos();
  }
};

let view = {
  displayTodos(){
    let todosUl = document.querySelector('ul');
    let complete = document.createElement('i');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position){
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';
      if(todo.completed===true){
        todoTextWithCompletion= '<span class="strike">'+todo.todoText+'</span>';
      }else{
        todoTextWithCompletion= todo.todoText;
      }
      todoLi.id = position;
      todoLi.className = 'toggle';
      todosUl.className = 'shadow card-design';
      todoLi.appendChild(this.createDeleteButton());
      todoLi.innerHTML += ' ' + todoTextWithCompletion;
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton(){
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners(){
    let todosUl = document.querySelector('ul');

    todosUl.addEventListener('click',function(event){
      let elementClicked = event.target;
      if(elementClicked.className === 'deleteButton'){
        editingInProgress = false;
        if(todoList.todos.length === 1){
          document.querySelector('ul').classList.remove("shadow");
        }
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }else if(preEdit === true){
        initialVal = todoList.todos[parseInt(elementClicked.id)];
        let initialValue = todoList.todos[parseInt(elementClicked.id)].todoText;
        elementClicked.innerHTML = '<input id="temp">';
        document.getElementById('temp').value = initialValue;
        edit = true;
        preEdit = false;
      }else if(elementClicked.className === 'toggle' || elementClicked.className === 'toggle strike'){
        editingInProgress = false;
        handlers.toggleCompleted(parseInt(elementClicked.id));
      }else if(edit===true){
        let temp = document.getElementById('temp');
        temp.addEventListener('keydown', function(event){
          if(event.keyCode === 13 && document.getElementById('temp').value.length>0){
            edit = false;
            handlers.changeTodo(parseInt(elementClicked.id), temp.value);
          }
        });
      }
    });

    todosUl.addEventListener('mousedown', function(){
      if(editingInProgress === false){
        timer = setTimeout(function(){
          preEdit = true;
          editingInProgress = true;
        }, 500);
      }
    });

    todosUl.addEventListener('touchstart', function(){
      if(editingInProgress === false){
        timer = setTimeout(function(){
          preEdit = true;
          editingInProgress = true;
        }, 500);
      }
    });

    todosUl.addEventListener('mouseup', function(){
      clearTimeout(timer);
    });

    todosUl.addEventListener('touchend', function(){
      clearTimeout(timer);
    });
  }
};

view.setUpEventListeners();
