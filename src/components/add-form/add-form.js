import React from "react";
import {useState} from "react";

import "./add-form.scss";

const AddForm = ({sendFunc}) =>{

  const [areaValue, setAreaValue] = useState(``);

  const onChange = ({target:{value}}) => setAreaValue(value);

  const onSend = async (evt) =>{
    evt.preventDefault();
    await sendFunc(areaValue);
  }

  return (
  <div className="add-form__wrapper">
    <form className="add-form" onSubmit={onSend}>
      <div className="add-form__fieldset-wrapper">
        <fieldset data-add-form>
          <textarea name="add-form__textarea" id="add-form__textarea" className="add-form__textarea" cols="30" rows="10" data-add-form value={areaValue} onChange={onChange}></textarea>
          <button type="button" className="add-form__button" data-add-form onClick={onSend}>Добавить</button>
        </fieldset>
      </div>
    </form>
  </div>);
}

export default AddForm;