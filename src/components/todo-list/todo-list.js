import React from "react";

import "./todo-list.scss";
import TodoItem from "../todo-item";
import AddButton from "../add-button";

const TodoList = () =>{
  return (
    <section className="todo-list">
      <div className="todo-list__wrapper">
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <AddButton></AddButton>
      </div>
    </section>
  );
}

export default TodoList;