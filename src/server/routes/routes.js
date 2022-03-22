const express = require('express');
const Todo = require('../models/models');
const useRouter = express.Router();

useRouter.get('/', (req, res) => {
  Todo.find((err, docs) => {
    if (err) console.log(err);
    res.json(docs);
  });
});

useRouter.post('/', (req, res) => {
  const todo = new Todo(req.body);
  todo.save((err, docs) => {
    if (err) console.log(err);
    res.json(docs);
  });
});

useRouter.put('/:id', (req, res) => {
  Todo.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (err, docs) => {
    if (err) console.log(err);
    res.json(docs);
  });
});

useRouter.delete('/:id', (req, res) => {
  Todo.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) console.log(err);
    res.json(docs);
  });
});

module.exports = useRouter;
