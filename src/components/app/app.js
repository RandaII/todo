import React from "react";

import "./app.scss";
import Header from "../header";
import TodoCategories from "../todo-categories";
import TodoList from "../todo-list";
import AddForm from "../add-form";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeAddFormStatus, fetchRecords} from "../../actions";
import {useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {returnRecords, filterByDoneStatus, addRecord} from "../../utils";

const App = ({addFormStatus, changeAddFormStatus, records, fetchRecords}) =>{

  const formSendFunc = async (text) =>{
    addRecord(text);
    await changeAddFormStatus(false);
    fetchRecords(returnRecords());
  }

  const categoriesLinks = [
    {
      href: `/`,
      title: `All tasks`,
      icon: `menu`
    },
    {
      href: `/todo`,
      title: `Todo`,
      icon: `list`
    },
    {
      href: `/done`,
      title: `Done`,
      icon: `done`
    }
  ]

  useEffect(() =>{
    fetchRecords(returnRecords());

    document.addEventListener(`click`, ({target}) =>{
      if (!target.dataset.addForm){
        changeAddFormStatus(false)
      }
    });
  },[]);

  const routes = (
    <Routes>

      <Route path="/" element={<TodoList>{records}</TodoList>
      } exact/>

      <Route path="/todo" element={
        <TodoList>{filterByDoneStatus(records, false)
        }</TodoList>
      } exact/>

      <Route path="/done" element={
        <TodoList>{filterByDoneStatus(records, true)
        }</TodoList>
      } exact/>

    </Routes>
  );

  const {pathname} = useLocation();

  const headerTitleId = categoriesLinks.findIndex(({href}) => pathname === href);

  return (
    <div className="app">
      <Header>{`Todo list - ${categoriesLinks[headerTitleId].title}`}</Header>
      <section className="app__main">
        <TodoCategories>{categoriesLinks}</TodoCategories>
        {routes}
      </section>
      {addFormStatus && <AddForm sendFunc={formSendFunc}/>}
    </div>
  );
}

const mapStateToProps = (state) =>{
  return {...state};
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    changeAddFormStatus,
    fetchRecords
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);