import React from "react";
import PropTypes from "prop-types";

import "./todo-item.scss";

const TodoItem = ({children:{date, text, done}, onInputChange, onCloseClick}) =>{

  let recDate = new Date(date);
  const nowDate = new Date();

  if (recDate.getDay() === nowDate.getDay()
    && recDate.getMonth() === nowDate.getMonth()
    && recDate.getFullYear() === nowDate.getFullYear()){
    recDate = new Intl.DateTimeFormat(`ru`, {hour:`2-digit`, minute:`2-digit`}).format(new Date(date))
  }
  else {
    recDate = new Intl.DateTimeFormat(`ru`, {day:`numeric`, month:`long`}).format(new Date(date))
  }

  const onKeyDown = ({target, key}) =>{
    if (target.dataset.todoItem && key === `Enter`){
      onInputChange();
    }
  }

  return (
    <div className="todo-item" tabIndex="0" onKeyDown={onKeyDown} data-todo-item>
      <input type="checkbox" name={date} id={date} onChange={onInputChange} checked={done}/>
      <label htmlFor={date}>
        <div className="todo-item__wrapper">
          <span className="todo-item__checkbox"></span>
          <span className="todo-item__text">{text}</span>
        </div>
        <p className="todo-item__date">{recDate}</p>
      </label>
      <button type="button" className="todo-item__close" onClick={onCloseClick}></button>
    </div>
  );
}

TodoItem.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.shape({
    date: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired
}

export default TodoItem;