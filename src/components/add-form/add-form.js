import React, {useState} from "react";
import PropTypes from "prop-types";

import "./add-form.scss";

const AddForm = ({sendFunc, children = ``}) =>{

  const [areaValue, setAreaValue] = useState(``);
  const [areaValueIsEmpty, setAreaValueIsEmpty] = useState(false);

  const onChange = ({target:{value}}) => setAreaValue(value);

  const notificationText = `Текст заметки пуст`;

  // при фокусе убираем уведомление
  const onFocus = () => setAreaValueIsEmpty(false);

  const onSend = async (evt) =>{
    evt.preventDefault();
    // если пустая строка, выводим уведомление
    if (areaValue.trim() === ``){
      setAreaValueIsEmpty(true);
      setAreaValue(``);
      return
    }

    sendFunc(areaValue);
  }

  return (
    <div className={`add-form__wrapper ${children}`}>
      <form className="add-form" onSubmit={onSend}>
        <div className="add-form__fieldset-wrapper">
        <h1 className="add-form__title" data-add-form>Добавить заметку</h1>
        <fieldset data-add-form>
          <textarea name="add-form__textarea" id="add-form__textarea" className="add-form__textarea" cols="30" rows="10" data-add-form value={areaValue} onChange={onChange} onFocus={onFocus} autoFocus={true}></textarea>
          {areaValueIsEmpty &&
          <p className="add-form__notification" data-add-form>{notificationText}</p>}
          <button type="button" className="add-form__button" data-add-form onClick={onSend}>Добавить</button>
        </fieldset>
      </div>
    </form>
  </div>
  );
}

AddForm.propTypes = {
  sendFunc: PropTypes.func.isRequired,
  children: PropTypes.string
}

export default AddForm;