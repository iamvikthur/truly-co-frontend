import { Component, SuspenseProps } from 'react';
import { ProfileContext } from '../lib/context';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends Component<SuspenseProps> {
  static defaultProps = { redirect: true };
  static contextType = ProfileContext;

  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const setProfilePanelOpened = this.context[1];

    if (this.state.hasError) {
      if (this.state.error.status === 401) {
        setProfilePanelOpened(true);
      }
      if (this.state.error.status === 404) {
        return <ErrorPage onClick={this.reset} />;
      }
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
