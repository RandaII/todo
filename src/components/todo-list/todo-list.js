import React, {useState, useEffect} from "react";

import TodoItem from "../todo-item";
import "./todo-list.scss";
import AddButton from "../add-button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeAddFormStatus, fetchRecords} from "../../actions";
import {changeDoneStatus, deleteRecord, returnRecords} from "../../utils";
import PropTypes from "prop-types";

const TodoList = ({changeAddFormStatus, fetchRecords, children = []}) =>{

  const [addButtonClass, setAddButtonClass] = useState(``);

  // по клику по AddButton отображается addForm
  const buttonClickFunc = () => changeAddFormStatus(true);

  const todoItems = children.map((value) =>{

    // при изменении input меняем done статус у данной заметки, и обновляем store
    const onInputChange = async () =>{
      changeDoneStatus(value.date)
      await fetchRecords(returnRecords());
    }

    // удаляем данную заметку, и обновляем store
    const onCloseClick = async () =>{
      deleteRecord(value.date);
      await fetchRecords(returnRecords());
    }

    return <TodoItem key={value.date} onInputChange={onInputChange} onCloseClick={onCloseClick}>{value}</TodoItem>;
  });

  // при обновлении, проверяем высоту документа и при необходимости меняем класс у addButton, для корректного отображения компонента
  useEffect(() =>{
    const classes = (document.querySelector(`.app`).clientHeight <= 604) ? ` fix-pos` : ``;
    setAddButtonClass(classes);
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

const mapStateToProps = () =>{return {};}

const  mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    changeAddFormStatus,
    fetchRecords
  }, dispatch);
}

TodoList.propTypes = {
  changeAddFormStatus: PropTypes.func.isRequired,
  fetchRecords: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }))
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);