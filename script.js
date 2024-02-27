document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
  
    todoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const todoText = todoInput.value.trim();
      if (todoText !== '') {
        addTodoItem(todoText);
        saveTodosToLocalStorage();
        todoInput.value = '';
      }
    });
  
    todoList.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('delete-btn')) {
        deleteTodoItem(target.parentElement.dataset.id);
        saveTodosToLocalStorage();
      } else if (target.classList.contains('complete-checkbox')) {
        toggleTodoCompleted(target.parentElement.dataset.id);
        saveTodosToLocalStorage();
      }
    });
  
    function addTodoItem(todoText) {
      const todoItem = document.createElement('li');
      const todoId = Date.now();
      todoItem.dataset.id = todoId;
      todoItem.innerHTML = `
        <input type="checkbox" class="complete-checkbox">
        <span>${todoText}</span>
        <button class="delete-btn">Delete</button>
      `;
      todoList.appendChild(todoItem);
    }
  
    function deleteTodoItem(id) {
      const todoItem = document.querySelector(`[data-id="${id}"]`);
      todoItem.remove();
    }
  
    function toggleTodoCompleted(id) {
      const todoItem = document.querySelector(`[data-id="${id}"]`);
      todoItem.classList.toggle('completed');
    }
  
    function saveTodosToLocalStorage() {
      const todos = Array.from(todoList.children).map(todo => ({
        id: todo.dataset.id,
        text: todo.querySelector('span').textContent,
        completed: todo.classList.contains('completed')
      }));
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function loadTodosFromLocalStorage() {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach(todo => {
        addTodoItem(todo.text);
        if (todo.completed) {
          toggleTodoCompleted(todo.id);
        }
      });
    }
  
    loadTodosFromLocalStorage();
  });
  