import React from "react";

import "./button.scss";

const AddButton = ({clickFunc, children = ``}) => <button onClick={clickFunc} className={`add-button ${children}`}>+</button>;

export default AddButton;