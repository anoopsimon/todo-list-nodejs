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
    showToast('Todo added successfully');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});


function addTodoToUI(todo) {
  const todoList = document.getElementById('todoList');
  const row = todoList.insertRow();
  row.id = `todo-${todo._id}`; // Set the ID of the row


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
                             <button onclick="deleteTodo('${todo._id}', '${row.id}')">Delete</button>`;
}


function deleteTodo(todoId, rowId) {
  fetch(`/todos/${todoId}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      // Remove the todo item from the UI
      const rowToRemove = document.getElementById(rowId);
      if (rowToRemove) {
          rowToRemove.remove();
      }
      console.log('Todo deleted:', data);
      showToast('Todo deleted successfully');
  })
  .catch(error => console.error('Error:', error));
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

function showToast(message) {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Remove the toast after the animation
  setTimeout(() => {
      toastContainer.removeChild(toast);
  }, 3000); // 3 seconds for fade out
}


// Call this function when the page loads
loadAndDisplayTodos();

  