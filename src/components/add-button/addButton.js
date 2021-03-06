import React from "react";
import PropTypes from "prop-types";

import "./button.scss";

// в children хранятся доп классы для button
const AddButton = ({clickFunc, children = ``}) => <button onClick={clickFunc} className={`add-button ${children}`}>+</button>;

AddButton.propTypes = {
  clickFunc: PropTypes.func.isRequired,
  children: PropTypes.string
}

export default AddButton;