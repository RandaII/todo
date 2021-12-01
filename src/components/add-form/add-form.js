import React from "react";

import "./add-form.scss";

const AddForm = () =>{
  return (
  <div className="add-form__wrapper">
    <form className="add-form">
      <div className="add-form__fieldset-wrapper">
        <fieldset>
          <textarea name="add-form__textarea" id="add-form__textarea" className="add-form__textarea" cols="30" rows="10"></textarea>
          <button className="add-form__button">Добавить</button>
        </fieldset>
      </div>
    </form>
  </div>)
}

export default AddForm;