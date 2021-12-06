import React from "react";

import "./button.scss";

const AddButton = ({clickFunc}) => <button onClick={clickFunc} className="add-button" data-add-form>+</button>;

export default AddButton;