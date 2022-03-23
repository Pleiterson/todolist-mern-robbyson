import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PopUp = styled.div`
  background-color: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  display: flex;
  justify-content: center;
  align-items: center;

  .popup-content {
    width: 400px;
    background-color: var(--color-background-one);
    padding: 20px;
    border: 1px solid var(--color-line-one);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 2px 2px rgba(2, 2, 2, 0.25);

    input[type=text] {
      width: 100%;
      padding: 20px;
      height: 10px;
      outline: none;
      border: 1px solid var(--color-line-one);
      border-radius: 6px;
      background: none;

      ::placeholder {
        color: var(--color-text-two);
      }
    }

    input[type=button] {
      margin-top: 20px;
      padding: 10px 5px;
      border-radius: 3px;
      border: 1px solid var(--color-line-one);
      transition: var(--transition);
      background: none;

      &:hover {
        background-color: var(--color-bg-hover-button);
      }
    }
  }
`;

const UpdateTodo = (props) => {
  const [todo, setTodo] = useState(props.todo.toDo);

  const updateTodo = () => {
    if (todo.trim() === '' || props.todo.toDo === todo) {
      props.removePopUp();
    } else {
      axios.put(`http://localhost:3001/todos/${props.todo._id}`, {
        _id: props.todo._id,
        toDo: todo,
        isComplete: props.todo.isComplete
      }).then(res => {
        props.removePopUp();
        props.updateTodo(res.data);
      }).catch(err => console.log(err));
    }
  }

  return (
    <PopUp className="popup">
      <div className="popup-content">
        <input type="text" placeholder="Atualize o To Do..." value={ props.toDo } onChange = {(event) => setTodo(event.target.value)} />
        <input type="button" value="Atualizar" onClick={() => updateTodo()} />
      </div>
    </PopUp>
  );
}

export default UpdateTodo;
