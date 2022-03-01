import React, {useEffect} from "react";
import {Transition} from "react-transition-group";
import {connect} from "react-redux";
import {setAddFormStatus, fetchRecordsWithCallback} from "../../actions";
import {Navigate, Route, Routes, useLocation,} from "react-router-dom";
import {filterByDoneStatus} from "../../utils";
import PropTypes from "prop-types";

import "./app.scss";
import Header from "../header";
import TodoCategories from "../todo-categories";
import TodoList from "../todo-list";
import AddForm from "../add-form";
import ErrorBoundary from "../error-boundary";

const App = ({addFormStatus, setAddFormStatus, records, fetchRecords}) =>{

  // функция для добавления записи
  const formSendFunc = async (text) =>{

    //добавляем запись в localstorage, а следом в store обновленный массив из localstorage
    fetchRecords(`addRecord`, text);

    // меняем AddFormStatus на false
    await setAddFormStatus(false);

    // скроллим страницу на начало документа
    setTimeout(async () =>
      window.scrollBy({
        top: -document.body.offsetHeight,
        behavior: 'smooth'
      }), 200);
  }

  // массив для todo-categories
  const categoriesLinks = [
    {
      id: 0,
      href: `/`,
      title: `All tasks`,
      icon: `menu`
    },
    {
      id: 1,
      href: `/todo`,
      title: `Todo`,
      icon: `list`
    },
    {
      id: 2,
      href: `/done`,
      title: `Done`,
      icon: `done`
    }
  ];

  // после первого монтирования, получаем в store массив записей из localstorage
  useEffect(() => fetchRecords(),[]);

  // в зависимости от категории сортируем массив записей в роутах
  const routes = (
    <ErrorBoundary>
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

        <Route path="*" element={<Navigate to="/"/>} />

      </Routes>
     </ErrorBoundary>
  );

  const {pathname} = useLocation();

  // получаем id для header
  const headerTitleId = categoriesLinks.findIndex(({href}) => pathname === href);

  // при активном модальном окне, при смене фокуса, если у элемента нет атрибута data-add-form, возвращаем фокус на предыдущий элемент
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

  // при активном модальном окне, при клике по элементу без атрибута data-add-form или нажатию Esc, меняем AddFormStatus на false
  const formCloseHandler = ({target, key}) =>{
    if (addFormStatus && (!target.dataset.addForm || key === `Escape`)){
      setAddFormStatus(false);
    }
  }

  return (
    <div id="app" className="app" onBlur={tabDownHandler} onMouseDown={formCloseHandler} onKeyUp={formCloseHandler}>
      <Header>{`Todo list - ${categoriesLinks[headerTitleId]?.title}`}</Header>
      <section className="app__main">
        <ErrorBoundary>
          <TodoCategories>{categoriesLinks}</TodoCategories>
        </ErrorBoundary>
        {routes}
      </section>

      <Transition
        in={addFormStatus}
        timeout={200}
        mountOnEnter
        unmountOnExit>
          {(state) =>
            <ErrorBoundary><AddForm sendFunc={formSendFunc}>{`${state}`}</AddForm></ErrorBoundary>
          }
      </Transition>
    </div>
  );
}

App.propTypes = {
  addFormStatus: PropTypes.bool.isRequired,
  setAddFormStatus: PropTypes.func.isRequired,
  fetchRecords: PropTypes.func.isRequired,
  records: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired
}

const mapStateToProps = (state) =>({...state});

const mapDispatchToProps = {
  setAddFormStatus,
  fetchRecords: fetchRecordsWithCallback
};

export default connect(mapStateToProps, mapDispatchToProps)(App);