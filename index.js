const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
//const dbConnectionStr = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://root:example@localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const todoSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  category: String,
  label: String
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save()
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get all todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.name = req.body.name;
      todo.dueDate = req.body.dueDate;
      todo.category = req.body.category;
      todo.label = req.body.label;

      todo.save()
        .then(() => res.json('Todo updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todo deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
