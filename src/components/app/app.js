import React from "react";

import "./app.scss";
import Header from "../header";
import TodoCategories from "../todo-categories";
import TodoList from "../todo-list";
import AddForm from "../add-form";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeAddFormStatus, fetchRecords} from "../../actions";
import {useState, useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {returnRecords, filterByDoneStatus, addRecord} from "../../utils";
import PropTypes from "prop-types";

const App = ({addFormStatus, changeAddFormStatus, records, fetchRecords}) =>{

  const [addFormClasses, setAddFormClasses] = useState(``);

  const formSendFunc = async (text) =>{
    setAddFormClasses(`hideBlock-animation`)
    addRecord(text);
    fetchRecords(returnRecords());
    setTimeout(async () =>{
      setAddFormClasses(``);
      await changeAddFormStatus(false);
      window.scrollBy({
        top: -document.body.offsetHeight,
        behavior: 'smooth'
      });
    }, 200)
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
  
  useEffect(() => fetchRecords(returnRecords()),[]);
  
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

  const tabDownHandler = (evt) =>{
    if (evt.relatedTarget === null){
      return;
    }
    if (addFormStatus){
      if (!evt.relatedTarget.dataset.addForm){
        evt.target.focus();
      }
    }
  }

  const appMouseDownHandler = ({target}) =>{
    if (addFormStatus && !target.dataset.addForm){
      setAddFormClasses(`hideBlock-animation`);
      setTimeout(() =>{
        changeAddFormStatus(false)
        setAddFormClasses(``);
      }, 200);
    }
  }

  return (
    <div className="app" onBlur={tabDownHandler} onMouseDown={appMouseDownHandler}>
      <Header>{`Todo list - ${categoriesLinks[headerTitleId].title}`}</Header>
      <section className="app__main">
        <TodoCategories>{categoriesLinks}</TodoCategories>
        {routes}
      </section>
      {addFormStatus && <AddForm sendFunc={formSendFunc}>{addFormClasses}</AddForm>}
    </div>
  );
}

App.propTypes = {
  addFormStatus: PropTypes.bool.isRequired,
  changeAddFormStatus: PropTypes.func.isRequired,
  fetchRecords: PropTypes.func.isRequired,
  records: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }))
}

const mapStateToProps = (state) =>{return {...state};}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    changeAddFormStatus,
    fetchRecords
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);