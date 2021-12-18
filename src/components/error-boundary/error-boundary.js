import React, {Component} from "react";
import PropTypes from "prop-types";
import Notification from "../notification";

class ErrorBoundary extends Component {

  static defaultProps = {
    children: PropTypes.element.isRequired
  }

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError){
      return <Notification/>;
    }
    else {
      return this.props.children;
    }
  }

}

export default ErrorBoundary;