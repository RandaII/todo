import React from "react";
import PropTypes from "prop-types";
import {formatDate} from "../../utils";

import "./todo-item.scss";

const TodoItem = ({children:{date, text, done}, onInputChange, onCloseClick}) =>{

  // форматируем дату заметки, в зависимости от дня добавления
  let recDate = formatDate(date);

  // функция меняет статус done у заметки при нажатии enter
  const onKeyDown = ({target, key}) =>{
    if (target.dataset.todoItem && key === `Enter`){
      onInputChange();
    }
  }

  return (
    <div className="todo-item" tabIndex="0" onKeyDown={onKeyDown} data-todo-item>
      <input type="checkbox"
             name={date}
             id={date}
             onChange={onInputChange}
             checked={done}/>
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