import React from 'react';
import ServerMetrics from './metrics/ServerMetrics';

const App = () => (
  <main className='vw-100 vh-100'>
    <div className='container secondary-color'>
      <h1 className='display-4'>API Monitor</h1>
      <ServerMetrics />
    </div>
  </main>
);

export default App;
