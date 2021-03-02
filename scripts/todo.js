/*
<p>
    <input type="checkbox" id="todoitem-1">
    <label for="todoitem-1">
        Cumpara lapte
    </label>
</p>
*/

function todoList() {
  // Cand se da click pe add, adaugam un todoitem nou
  //      OnSubmit
  //          Oprim submit-ul default
  //          Luam valoare din input
  //          Sa cream toate elementele p, label, input
  //          Configurat elementele cu continut si atributele de care au nevoie
  //          Sa bagam in p inputul si label-ul
  //          Sa bagam in lista p-ul
  const storageName = 'todoList';
  const todoList = document.querySelector('[data-todo-list]');

  const form = document.querySelector('[data-todo-form]');
  form.addEventListener('submit', handleAddTodo);

  // Event delegation
  todoList.addEventListener('change', handleTodoCheck);

  const deleteBtn = document.querySelector('[data-todo-delete]');
  deleteBtn.addEventListener('click', handleDeleteTodos);

  let todos = [];

  function renderTodos() {
    const existingTodos = localStorage.getItem(storageName);
    if (existingTodos) {
      todos = JSON.parse(existingTodos);
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];

      // Este contraindicat ca intr-un for sa modificam dom-ul
      const newTodo = createTodo(todo, i + 1);
      fragment.appendChild(newTodo);
    }
    todoList.innerHTML = '';
    todoList.appendChild(fragment);
  }
  renderTodos();

  function handleAddTodo(e) {
    e.preventDefault();

    const value = form.elements.title.value;
    const newTodo = { title: value, completed: false };

    todos.push(newTodo);
    persistTodos(todos);

    // const todo = createTodo(newTodo, todos.length);
    // todoList.appendChild(todo);
    renderTodos();
  }

  function createTodo(todo, id) {
    const todoContainer = document.createElement('p');
    const todoCheck = document.createElement('input');
    const todoText = document.createElement('label');

    todoCheck.type = 'checkbox';
    todoCheck.id = 'todoitem-' + id;
    if (todo.completed) {
      todoCheck.checked = true;
    }
    todoContainer.appendChild(todoCheck);

    todoText.innerText = todo.title;
    todoText.htmlFor = todoCheck.id;
    todoContainer.appendChild(todoText);

    // Contraindicat sa facem modificari direct in DOM in cazul in care suntem intr-un for
    // todoList.appendChild(todoContainer);

    return todoContainer;
  }

  function handleTodoCheck(e) {
    const idToDelete = Number(e.target.id.split('-')[1]);

    todos[idToDelete - 1].completed = e.target.checked;
    persistTodos(todos);
  }

  function handleDeleteTodos() {
    const newTodos = [];
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      if (!todo.completed) {
        newTodos.push(todo);
      }
    }

    persistTodos(newTodos);
    renderTodos();
  }

  function persistTodos(todos) {
    localStorage.setItem(storageName, JSON.stringify(todos));
  }
}

todoList();
