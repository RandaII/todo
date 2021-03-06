import React, {useState} from "react";
import PropTypes from "prop-types";

import "./add-form.scss";

const AddForm = ({sendFunc, areaText = ``, children = ``, type}) =>{

  const [areaValue, setAreaValue] = useState(areaText);

  // для вывода уведомления, при попытке отправить пустое value
  const [areaValueIsEmpty, setAreaValueIsEmpty] = useState(false);

  const onChange = ({target:{value}}) => setAreaValue(value);

  let title;
  let buttonTitle;

  // в завимости от типа меняем title
  if (type === `edit`){
    title = `Изменить заметку`;
    buttonTitle = `Изменить`;
  }
  else if (type === `add`) {
    title = `Добавить заметку`;
    buttonTitle = `Добавить`;
  }

  const notificationText = `Текст заметки пуст`;

  // при фокусе убираем уведомление
  const onFocus = () => setAreaValueIsEmpty(false);

  const onSubmit = (evt) =>{
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
      <form className="add-form" onSubmit={onSubmit}>
        <div className="add-form__fieldset-wrapper">
        <h1 className="add-form__title" data-add-form>{title}</h1>
        <fieldset data-add-form>
          <textarea name="add-form__textarea" id="add-form__textarea" className="add-form__textarea" cols="30" rows="10" data-add-form value={areaValue} onChange={onChange} onFocus={onFocus} autoFocus={true}></textarea>
          {areaValueIsEmpty &&
          <p className="add-form__notification" data-add-form>{notificationText}</p>}
          <button type="button" className="add-form__button" data-add-form onClick={onSubmit}>{buttonTitle}</button>
        </fieldset>
      </div>
    </form>
  </div>
  );
}

AddForm.propTypes = {
  sendFunc: PropTypes.func.isRequired,
  children: PropTypes.string,
  areaText: PropTypes.string,
  type: PropTypes.string
}

export default AddForm;