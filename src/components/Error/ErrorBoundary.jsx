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
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
          }}
        >
          <h2>Something Went Wrong</h2>
          <p>{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
