import React from 'react';

import {Navbar} from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <div id="navBar">
        <Navbar />
      </div>
      <Routes />
    </div>
  );
};

export default App;
