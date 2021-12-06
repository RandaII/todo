import React from "react";
import icons from "./img";
import {NavLink} from "react-router-dom";

import "./todo-categories.scss";

const TodoCategories = ({children}) =>
   (<aside className="todo-categories">
    <div className="todo-categories__wrapper">
      {children.map(({href, title, icon}, key) =>
        (<NavLink to={href} className="todo-categories__item" key={key}>
          <img src={icons[icon]} alt="" className="todo-categories__icon"/>
          < span className="todo-categories__title">{title}</span>
        </NavLink>)
      )}
    </div>
  </aside>);

export default TodoCategories;