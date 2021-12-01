import React from "react";

import "./todo-item.scss";

const TodoItem = () =>{
  return (
    <div className="todo-item">
      <input type="checkbox" name="item1" id="item1"/>
      <label htmlFor="item1">
        <div className="todo-item__wrapper">
          <span className="todo-item__checkbox"></span>
          <span className="todo-item__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad nam nulla perspiciatis! Ex, similique, voluptate!</span>
        </div>
        <p className="todo-item__date">18 марта</p>
      </label>
    </div>
  );
}

export default TodoItem;