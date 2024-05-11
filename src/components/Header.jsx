import './Header.css';
import { useState, useEffect } from 'react';

export default function Header(props) {
  const {} = props;
  const [showHowModal, setShowHowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#0c0c0c');
      document.documentElement.style.setProperty('--input-bg-color', '#acacac');
      document.documentElement.style.setProperty('--button-bg-color', '#1a1a1a');
      document.documentElement.style.setProperty('--button-text-color', '#ffffff');
      document.documentElement.style.setProperty('--button-hover-color', '#2a2a2a');
      document.documentElement.style.setProperty('--nav-item-color', '#7f7f7f');
      document.documentElement.style.setProperty('--svg-bg-color', '#d9d9d9');
      document.documentElement.style.setProperty('--svg-bg-hover-color', '#c3c3c3');
      document.documentElement.style.setProperty('--todo-check-color', '#51cd84');
      document.documentElement.style.setProperty('--link-color', '#51cd84');
      document.documentElement.style.setProperty('--link-color-hover', '#2c744a');
      document.documentElement.style.setProperty('--modal-bg-color', '#e4e4e4e7');
    } else {
      document.documentElement.style.setProperty('--background-color', '#242424');
      document.documentElement.style.setProperty('--text-color', '#ffffffde');
      document.documentElement.style.setProperty('--input-bg-color', '#3e3e3e');
      document.documentElement.style.setProperty('--button-bg-color', '#ffffff');
      document.documentElement.style.setProperty('--button-text-color', '#1a1a1a');
      document.documentElement.style.setProperty('--button-hover-color', '#848484');
      document.documentElement.style.setProperty('--nav-item-color', '#7f7f7f');
      document.documentElement.style.setProperty('--svg-bg-color', '#353535');
      document.documentElement.style.setProperty('--svg-bg-hover-color', '#434343');
      document.documentElement.style.setProperty('--todo-check-color', '#1d643a');
      document.documentElement.style.setProperty('--link-color', '#1d643a');
      document.documentElement.style.setProperty('--link-color-hover', '#32a060');
      document.documentElement.style.setProperty('--modal-bg-color', '#3f3f3fe7');
    }
  }, [theme]);

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  }

  const toggleShowHowModal = () => {
    setShowHowModal(!showHowModal);
  }

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  
  return (
    <div className='header'>
      <div className='title-section'>
        <img src="/task.svg" alt="" />
        <h2><span>Snap</span>Task</h2>
      </div>
      <nav>
        <div className='nav-item' onClick={toggleInfoModal}>Info</div>
        <div className='nav-item' onClick={toggleShowHowModal}>How It Works</div>
        <div className='nav-item' onClick={toggleSettingsModal}>Settings</div>
        <div className='nav-item'>
          <a href="https://github.com/WindBreaker1/snaptask" 
          target="_blank" rel="noopener noreferrer">Source Code</a>
        </div>
      </nav>

      {showSettingsModal && (
        <div className='modal'>
          <h2>Settings</h2>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <button onClick={toggleSettingsModal}>Exit</button>
        </div>
      )}

      {showHowModal && (
        <div className='modal'>
          <h2>How It Works</h2>
          <p>
            Select an icon. Inside the first input, you can paste your own emoji or select one using the `windows key + .` on Windows, or `control + command + space` on Mac.
          </p>
          <p>
            You can then select a title and description for your task. Edit the task title and description by clicking on the text at any time!
          </p>
          <p>
            Finally, input the time in seconds you think it will take to complete the task and click the add button to 'add' it to the list.
          </p>
          <p>
            <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>Beware!</span> The task will delete itself after the time is up! This should help you stop procrastinating and start doing the hard work.
          </p>
          <p>
            If you've completed a task, congratulations! You can check it off by clicking the checkbox!
          </p>
          <button onClick={toggleShowHowModal}>Exit</button>
        </div>
      )}

      {showInfoModal && (
        <div className='modal'>
          <h2>Info</h2>
          <p>
            SnapTask is a simple app based on the concept of 'eat the frog', popularized by Brian Tracy, in his book, <a href="https://www.goodreads.com/book/show/95887.Eat_That_Frog_" target="_blank" rel="noopener noreferrer">Eat that frog!</a>. 
          </p>
          <p>
            The idea is that if the first thing you do each morning is to eat a live frog, you can continue knowing that it's probably the worst thing that's going to happen to you that day.
          </p>
          <p>
            However, it can be hard to find a frog to eat, so SnapTask is here to help you find the frog(🐸) in your to-do list(📃) and get it done as fast(⚡) as possible.
          </p>
          <button onClick={toggleInfoModal}>Exit</button>
        </div>
      )}
    </div>
  )
}