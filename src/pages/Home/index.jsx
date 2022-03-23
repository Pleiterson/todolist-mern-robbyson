import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import ShowTodo from './components/ShowTodo';
import UpdateTodo from './components/UpdateTodo';

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoToUpdate, setTodoToUpdate] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/todos').then(res => {
      setTodoList(res.data);
    }).catch(err => console.log(err));
  }, []);

  const addTodo = newTodo => {
    setTodoList([...todoList, newTodo]);
  }

  const todoComplete = (todos) => {
    const newList = [...todoList];
    
    newList.forEach(item => {
      if (item._id === todos._id) {
        item.isComplete = todos.isComplete;
      }
    });
    setTodoList(newList);
  }

  const removeTodo = (todos) => {
    const newList = todoList.filter(item => !(item._id === todos._id));
    setTodoList(newList);
  }

  const updateTodo = (todos) => {
    const newList = [...todoList];

    newList.forEach(item => {
      if (item._id === todos._id) {
        item.toDo = todos.toDo;
      }
    });
    setTodoList(newList);
  }

  return (
    <>
      <AddTodo addTodo={ addTodo } />
      <ShowTodo
        todoList={ todoList }
        todoComplete={ todoComplete }
        removeTodo={ removeTodo }
        todoToUpdate={(todos) => setTodoToUpdate(todos)}
        showPopUp={() => setShowPopUp(!showPopUp)}
      />
      { showPopUp && <UpdateTodo todo={ todoToUpdate } updateTodo={ updateTodo } removePopUp={() => setShowPopUp(!showPopUp)} />}
    </>
  );
}

export default Home;
