import React, {Component} from "react";
import Notification from "../notification";

class ErrorBoundary extends Component {

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