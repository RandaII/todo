import React from "react";
import PropTypes from "prop-types";
import {formatDate} from "../../utils";

import "./todo-item.scss";

const TodoItem = ({children:{date, text, done}, onInputChange, onCloseClick, editFunc}) =>{

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
      <div className="todo-item__button-container">
        <button
          type="button"
          className="todo-item__edit"
          onClick={editFunc}>
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="18px" height="18px">    <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"/></svg>
        </button>
        <button
          type="button"
          className="todo-item__close"
          onClick={onCloseClick}></button>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
  children: PropTypes.shape({
    date: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired
}

export default TodoItem;