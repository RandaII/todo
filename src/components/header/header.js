import React from "react";
import PropTypes from "prop-types";
import "./header.scss";

const Header = ({children = ``}) => <div className="header">{children}</div>;

Header.propTypes = {
  children: PropTypes.string
}

export default Header;