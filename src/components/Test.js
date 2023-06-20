import React, { Suspense } from 'react';

// eslint-disable-next-line import/no-unresolved
const App1 = React.lazy(() => import('pufferfishclient/App'));

function Test() {
  return (
    <div className="App">
      Host Application
      <Suspense fallback="Loading...">
        <App1 />
      </Suspense>
    </div>
  );
}

export default Test;
