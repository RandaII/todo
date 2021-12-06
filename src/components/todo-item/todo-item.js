import React from "react";

import "./todo-item.scss";

const TodoItem = ({children:{date, text, done = false}, onInputChange, onCloseClick}) =>{

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

  return (
    <div className="todo-item">
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

export default TodoItem;