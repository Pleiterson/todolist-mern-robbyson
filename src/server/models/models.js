const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    toDo: String,
    isComplete: Boolean
});

const Todo = mongoose.model('todo',TodoSchema);

module.exports = Todo;
