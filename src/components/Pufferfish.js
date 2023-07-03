import React, { Suspense } from 'react';

// eslint-disable-next-line import/no-unresolved
const RemotePufferfish = React.lazy(() => import('pufferfishclient/App'));

function Pufferfish() {
  return (
    <div className="sc-gFqAkR ggMBuA" style={{ height: '2100px' }}>
      <Suspense fallback="Loading...">
        <RemotePufferfish />
      </Suspense>
    </div>
  );
}

export default Pufferfish;
