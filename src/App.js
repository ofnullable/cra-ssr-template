import React from 'react';
import Menu from './components/Menu';

import Routes from './routes';

const App = () => {
  return (
    <div>
      <Menu/>
      <hr/>
      <Routes />
    </div>
  );
};

export default App;