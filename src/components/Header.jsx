import './Header.css';
import { useState, useEffect } from 'react';

export default function Header(props) {
  const {} = props;
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

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
      document.documentElement.style.setProperty('--link-color', '#747bff');
      document.documentElement.style.setProperty('--link-color-hover', '#535bf2');
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
      document.documentElement.style.setProperty('--link-color', '#4e1ddf');
      document.documentElement.style.setProperty('--link-color-hover', '#2251c5');
    }
  }, [theme]);

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);
  }

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
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
        <div className='nav-item' onClick={toggleSettingsModal}>Settings</div>
        <div className='nav-item'>Source Code</div>
      </nav>

      {showSettingsModal && (
        <div className='modal'>
          <h1>Settings</h1>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <button onClick={toggleSettingsModal}>Exit</button>
        </div>
      )}

      {showInfoModal && (
        <div className='modal'>
          <h1>Info</h1>
          <button onClick={toggleInfoModal}>Exit</button>
        </div>
      )}
    </div>
  )
}