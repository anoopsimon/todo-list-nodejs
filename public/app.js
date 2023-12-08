document.getElementById('newTodoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const dueDate = document.getElementById('dueDate').value;
  const category = document.getElementById('category').value;
  const label = document.getElementById('label').value;

  fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, dueDate, category, label }),
  })
  .then(response => response.json())
  .then(data => {
    addTodoToUI(data); // Update the UI with the new todo
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});


function addTodoToUI(todo) {
  const todoList = document.getElementById('todoList');
  const row = todoList.insertRow();

  const nameCell = row.insertCell(0);
  nameCell.textContent = todo.name;

  const dueDateCell = row.insertCell(1);
  dueDateCell.textContent = todo.dueDate;

  const categoryCell = row.insertCell(2);
  categoryCell.textContent = todo.category;

  const labelCell = row.insertCell(3);
  labelCell.textContent = todo.label;

  const actionsCell = row.insertCell(4);
  actionsCell.innerHTML = `<button onclick="editTodo('${todo._id}')">Edit</button>
                           <button onclick="deleteTodo('${todo._id}')">Delete</button>`;
}


function loadAndDisplayTodos() {
  fetch('/todos')
  .then(response => response.json())
  .then(todos => {
      todos.forEach(todo => {
          addTodoToUI(todo);
      });
  })
  .catch(error => console.error('Error loading todos:', error));
}

// Call this function when the page loads
loadAndDisplayTodos();

  