
import { Views } from './views';
import React from 'react';
import ErrorBoundary from './components/errorboundry';



function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary >
        <div className="App">
          <Views />
        </div>
      </ErrorBoundary>

    </React.StrictMode>
  );
}

export default App;
