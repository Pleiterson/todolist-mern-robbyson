import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';

export default function Home() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/todos').then(res => {
      setTodoList(res.data);
    }).catch(err => console.log(err));
  }, []);

  const addTodo = newTodo => {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      <AddTodo addTodo={ addTodo } />
    </>
  );
}
