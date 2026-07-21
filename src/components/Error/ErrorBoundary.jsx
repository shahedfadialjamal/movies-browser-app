import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2 style={{ textalign: ' center', marginTop: '40px' }}>
          Something Went Wrong. {this.state.message}
        </h2>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
