import React from "react";
import { motion } from "framer-motion";
import { Card, Button } from "./";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/home";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h1>

              <p className="text-gray-600 mb-6">
                We're sorry for the inconvenience. The application encountered
                an unexpected error.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <div className="text-xs text-red-800 font-mono">
                    <div className="font-semibold mb-2">Error Details:</div>
                    <div className="whitespace-pre-wrap break-all">
                      {this.state.error.toString()}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {" "}
                <Button
                  onClick={this.handleRefresh}
                  variant="primary"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <FaRedo />
                  <span>Try Again</span>
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="secondary"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <FaHome />
                  <span>Go to Home</span>
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                If this problem persists, please contact support.
              </p>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
