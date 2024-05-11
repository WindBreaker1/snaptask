import './App.css'
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [icon, setIcon] = useState('');
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');

  const [time, setTime] = useState('');

  const addTodo = () => {
    const newTodo = { id: Date.now(), icon: icon, title: title, text: input, time: time, checked: false };
    setTodos([...todos, newTodo]);
    setIcon('');
    setTitle('');
    setInput('');
    setTime('');
  }

  const deleteTodo = (idToDelete) => {
    setTodos(todos.filter(todo => todo.id !== idToDelete));
  }

  const moveUp = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === 0) return; // Can't move up the first item
  
    const newTodos = [...todos];
    const temp = newTodos[index];
    newTodos[index] = newTodos[index - 1];
    newTodos[index - 1] = temp;
  
    setTodos(newTodos);
  };
  
  const moveDown = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === todos.length - 1) return; // Can't move down the last item
  
    const newTodos = [...todos];
    const temp = newTodos[index];
    newTodos[index] = newTodos[index + 1];
    newTodos[index + 1] = temp;
  
    setTodos(newTodos);
  };

  const formatTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
  
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodos(todos => todos.map(todo => {
        if (todo.time > 0 && !todo.checked) {
          return { ...todo, time: todo.time - 1 };
        } else {
          return todo;
        }
      }));
  
      setTodos(todos => todos.filter(todo => todo.time > 0));
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);

  const toggleChecked = (id) => {
    setTodos(todos => todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      } else {
        return todo;
      }
    }));
  }

  return (
    <div className='app'>
      {/* header */}
      <Header />
      {/* input section */}
      <div className='input-section'>
        <input value={icon} onChange={e => setIcon(e.target.value)}
         placeholder='Change task icon...' />
        <input value={title} onChange={e => setTitle(e.target.value)}
         placeholder='Write task title...' />
        <input value={input} onChange={e => setInput(e.target.value)}
         placeholder='Write task description...' />
        <input type='number' value={time} onChange={e => setTime(e.target.value)} 
          placeholder='Input timer (seconds)...' />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className='grid-container'>
        {todos.map((todo) => (
          <Todo  
          key={todo.id} 
          icon={todo.icon}
          title={todo.title}
          text={todo.text} 
          time={formatTime(todo.time)}
          toggleChecked={toggleChecked}
          deleteTodo={() => deleteTodo(todo.id)} 
          moveUp={() => moveUp(todo.id)} 
          moveDown={() => moveDown(todo.id)} 
          appValues={{todo, todos, setTodos, input, setInput}}
          />
        ))}
      </div>
      {/* footer */}
    </div>
  );
}

export default App;