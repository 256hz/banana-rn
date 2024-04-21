import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /*
      TODO: setup error reporting service--
      for now this is a basic catch for component failures,
      analyze console error for now as a stop-gap.
    */
    console.error('Error caught by Boundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>Something went wrong.</h1>
        /*
          TODO: 404 or "This page went bananas"
            text input <form/>
            "let us know what you were doing when this page crashed."
        */
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
