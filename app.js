document.getElementById('newTodoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Insert to database.')
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
      console.log('Success:', data);
      // Add code to update the UI
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  