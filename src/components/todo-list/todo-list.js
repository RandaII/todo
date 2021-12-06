import React from "react";

import "./todo-list.scss";
import TodoItem from "../todo-item";
import AddButton from "../add-button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeAddFormStatus, fetchRecords} from "../../actions";
import {changeDoneStatus, deleteRecord, returnRecords} from "../../utils";

const TodoList = ({changeAddFormStatus, fetchRecords, children = []}) =>{

  const buttonClickFunc = () => changeAddFormStatus(true);

  const todoItems = children.map((value) =>{

    const onInputChange = async () =>{
      changeDoneStatus(value.date)
      await fetchRecords(returnRecords());
    }

    const onCloseClick = async () =>{
      deleteRecord(value.date);
      await fetchRecords(returnRecords());
    }

    return <TodoItem key={value.date} onInputChange={onInputChange} onCloseClick={onCloseClick}>{value}</TodoItem>;
  });

  return (
    <section className="todo-list">
      <div className="todo-list__wrapper">
        {todoItems}
        <AddButton clickFunc={buttonClickFunc}></AddButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);