import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setAddForm, fetchRecordsWithCallback} from "../../actions";

import TodoItem from "../todo-item";
import AddButton from "../add-button";
import "./todo-list.scss";


const TodoList = ({setAddForm, fetchRecords, children = []}) =>{

  const [addButtonClass, setAddButtonClass] = useState(``);

  // по клику по AddButton отображается addForm
  const buttonClickFunc = () => setAddForm({
    status: true,
    type: `add`
  });

  const todoItems = children.map((value) =>{

    // при изменении input меняем done статус у данной заметки, и обновляем store
    const onInputChange = () => fetchRecords(`changeDoneStatus`,value.date);

    // удаляем данную заметку, и обновляем store
    const onCloseClick = () => fetchRecords(`deleteRecord`, value.date);

    return <TodoItem key={value.date} onInputChange={onInputChange} onCloseClick={onCloseClick}>{value}</TodoItem>;
  });

  // при обновлении, проверяем высоту документа и при необходимости меняем класс у addButton, для корректного отображения компонента

  useEffect(() =>{
    const classes = (document.getElementById(`app`).clientHeight <= 604) ? ` fix-pos` : ``;
    (addButtonClass !== classes) && setAddButtonClass(classes);
  });

  return (
    <section className="todo-list" aria-label="Todo Tabs">
      <div className="todo-list__wrapper">
        {todoItems}
        <AddButton clickFunc={buttonClickFunc}>{addButtonClass}</AddButton>
      </div>
    </section>
  );
}

const mapStateToProps = () =>({});

const  mapDispatchToProps ={
  setAddForm,
  fetchRecords: fetchRecordsWithCallback
}

TodoList.propTypes = {
  setAddForm: PropTypes.func.isRequired,
  fetchRecords: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }))
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);