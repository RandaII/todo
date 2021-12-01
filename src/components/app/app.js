import React from "react";

import "./app.scss";
import Header from "../header";
import TodoCategories from "../todo-categories";
import TodoList from "../todo-list";
import AddForm from "../add-form";

const App = () =>{
  return (
    <div className="app">
      <Header/>
      <section className="app__main">
        <TodoCategories/>
        <TodoList></TodoList>
      </section>
    </div>
  );
}

export default App;