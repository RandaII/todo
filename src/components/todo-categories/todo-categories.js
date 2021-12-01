import React from "react";
import icons from "./img";

import "./todo-categories.scss";

const TodoCategories = () =>{
  return (
    <aside className="todo-categories">
      <div className="todo-categories__wrapper">
        <a href="" className="todo-categories__item">
          <img src={icons.menu} alt="" className="todo-categories__icon"/>
          < span className="todo-categories__title">All tasks</span>
        </a>
        <a href="" className="todo-categories__item">
          <img src={icons.list} alt="" className="todo-categories__icon"/>
          <span className="todo-categories__title">Todo</span>
        </a>
        <a href="" className="todo-categories__item">
          <img src={icons.done} alt="" className="todo-categories__icon"/>
          <span className="todo-categories__title">Done</span>
        </a>
      </div>
    </aside>
  );
}

export default TodoCategories;