import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Container = styled.div`
  text-align: center;
  margin: 20px auto;
  width: 80%;
  
  h1 {
    margin-bottom: 20px;
  }
`;

const Menu = styled.div`
  input {
    margin: 0 5px;
    height: 40px;
    outline: none;
    border: none;
    background: none;
  }

  input[type=text] {
    width: 50%;
    border-bottom: 2px solid var(--color-line-one);
    padding: 10px;
    color: var(--color-text-one);

    ::placeholder {
      color: var(--color-text-two);
    }
  }

  input[type=button] {
    width: 15%;
    padding: 10px 5px;
    border-radius: 3px;
    border: 1px solid var(--color-line-one);
    transition: var(--transition);

    &:hover {
      background-color: var(--color-bg-hover-button);
    }
  }
`;

const AddTodo = (props) => {
  const [todo, setTodo] = useState('');

  const addTodo = () => {
    if (todo.trim() === ''){
      return;
    } else {
      axios.post('http://localhost:3001/todos', {
        toDo: todo,
        isComplete: false
      }).then(res => {
        setTodo("");
        props.addTodo(res.data);
      }).catch(err => console.log(err));
    }
  }

  return (
    <Main>
      <Container>
        <h1>TODO List - Case Robbyson</h1>

        <Menu>
          <input type="text" placeholder = "Adicione um To Do..." value={ todo } onChange = { event => setTodo(event.target.value) } />
          <input type="button" value="Adicionar To Do" onClick = {() => addTodo()} />
        </Menu>
      </Container>
    </Main>
  );
}

export default AddTodo;
