import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log("error logged 3");
        // Update state so the next render will show the fallback UI.
        this.setState({ hasError: true });
        return { hasError: true };


        
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.log("error logged");
        console.log(error, errorInfo);
      }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }


}


export default ErrorBoundary;