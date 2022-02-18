import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import icons from "./img";

import "./todo-categories.scss";

const TodoCategories = ({children}) =>
  (<aside className="todo-categories">
    <div className="todo-categories__wrapper">
      {children.map(({id, href, title, icon}) =>
        (<NavLink to={href} className="todo-categories__item" key={id}>
          {icons[icon]}
          < span className="todo-categories__title">{title}</span>
        </NavLink>)
      )}
    </div>
  </aside>);

TodoCategories.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })).isRequired
}

export default TodoCategories;