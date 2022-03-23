import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  ul {
    list-style: none;
    width: 50%;
  }

  li {
    margin: 10px;
    border-radius: 20px;
    border: 1px solid var(--color-line-one);
    transition: var(--transition);
    background: none;

    &:hover {
      background-color: var(--color-bg-hover-button);
    }
  }

  ul li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    transition: var(--transition);
    user-select: none;
    cursor: pointer;

    .isComplete {
      color: var(--color-icon-one);
      margin-right: 10px;
    }

    .checkIcon {
      margin-right: 10px;
    }

    p.todosComplete {
      text-decoration: line-through;
    }

    .edit, .close {
      margin-left: 10px;
    }

    .edit:hover {
      color: var(--color-icon-two);
    }

    .close:hover {
      color: var(--color-icon-three);
    }
  }
`;

const ShowTodo = (props) => {
  const todoList = props.todoList.map((todos, index) => {
    const todoComplete = (todos) => {
      axios.put(`http://localhost:3001/todos/${todos._id}`, {
        _id: todos._id,
        toDo: todos.toDo,
        isComplete: !todos.isComplete
      }).then(res => props.todoComplete(res.data)).catch(err => console.log(err));
    }

    const removeTodo = (id) => {
      axios.delete(`http://localhost:3001/todos/${id}`).then(res => props.removeTodo(res.data)).catch(err => console.log(err));
    }

    return (
      <li key={ index }>
        <div style={{ display: 'flex' }}>
          <CheckIcon className={ todos.isComplete ? 'isComplete' : 'checkIcon' } />
          <p className={ todos.isComplete ? 'todosComplete' : '' } onClick={() => { todoComplete(todos); }}>{ todos.toDo }</p>
        </div>
        <div>
          <EditIcon className="edit" onClick={() => {
            props.todoToUpdate(todos);
            props.showPopUp();
          }} />
          <CloseIcon className="close" onClick={() => { removeTodo(todos._id); }} />
        </div>
      </li>
    );
  });

  return (
    <Main>
      <List>
        <ul>
          { todoList }
        </ul>
      </List>
    </Main>
  );
}

export default ShowTodo;
