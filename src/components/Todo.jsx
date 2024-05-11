import './Todo.css';
import { useState } from 'react';
import upSvg from '../assets/up.svg';
import downSvg from '../assets/down.svg';
import trashSvg from '../assets/trash.svg';
import checkSvg from '../assets/check.svg';
import xSvg from '../assets/x.svg';

export default function Todo(props) {
  const {icon, title, text, time, todo, id, checked, toggleCheck, deleteTodo, moveUp, moveDown} = props;

  const [isEditingIcon, setIsEditingIcon] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(icon);
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleKeyDownIcon = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditingIcon(false);
    }
  };

  const handleKeyDownTitle = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className='todo-container' 
      style={{ backgroundColor: checked ? 'var(--todo-check-color)' : 'initial' }}>
      <div className='title-section'>
        {/* icon */}
        {isEditingIcon ? (
          <input 
            id='todo-icon-input'
            value={currentIcon}
            onChange={e => setCurrentIcon(e.target.value)}
            onKeyDown={handleKeyDownIcon}
            autoFocus
          />
        ) : (
          <span id='todo-icon' onClick={() => setIsEditingIcon(true)}>{currentIcon}</span>
        )}
        {/* title */}
        {isEditingTitle ? (
          <textarea
            value={currentTitle}
            onChange={e => setCurrentTitle(e.target.value)}
            onKeyDown={handleKeyDownTitle}
            autoFocus
          />
        ) : (
          <h2 id='todo-title' onClick={() => setIsEditingTitle(true)}>{currentTitle}</h2>
        )}
      </div>
      {/* description */}
      {isEditing ? (
        <textarea
          value={currentText} 
          onChange={e => setCurrentText(e.target.value)} 
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span id='todo-text-input' onClick={() => setIsEditing(true)}>{currentText}</span>
      )}
      {/* time */}
      <div>Time remaining: {time}</div>
      {/* all buttons */}
      <div className='todo-buttons'>
        {/* checkbox */}
        <button className={`check-button ${checked ? 'checked' : ''}`} onClick={() => toggleCheck(id)}></button>
        {/* functional buttons */}
        <img className='svg' src={upSvg} alt="Move up" onClick={moveUp} />
        <img className='svg' src={downSvg} alt="Move down" onClick={moveDown} />
        <img className='svg' src={trashSvg} alt="Delete" onClick={deleteTodo} />
      </div>
    </div>
  )
}
