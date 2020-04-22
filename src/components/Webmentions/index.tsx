import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import { WebmentionCount } from './WebmentionCount';
import { WebmentionReplies } from './WebmentionReplies';

const WebmentionFallbackComponent: React.FC<{}> = ({
  componentStack,
  error,
}) => <div>Webmention fallback</div>;

const Webmention: React.FC<{}> = ({ target }) => {
  return (
    <ErrorBoundary FallbackComponent={WebmentionFallbackComponent}>
      <h2>Webmentions</h2>
      <WebmentionReplies target={target} />
    </ErrorBoundary>
  );
};

export { WebmentionCount };
export default Webmention;
