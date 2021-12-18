import React from "react";
import "./header.scss";
import PropTypes from "prop-types";

const Header = ({children = ``}) => <div className="header">{children}</div>;

Header.propTypes = {
  children: PropTypes.string
}

export default Header;