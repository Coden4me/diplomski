import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: { message: "", stack: "", name: "" },
      info: { componentStack: "" },
    };
  }

  componentDidCatch(error, info) {
    this.setState(() => ({ error, info, hasError: true }));
  }

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    const display = hasError ? (
      <>
        <h1>{error.toString()}</h1>
        <h1>{info.componentStack.toString()}</h1>
      </>
    ) : (
      <>{children}</>
    );

    return display;
  }
}

export default ErrorBoundary;
