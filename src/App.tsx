import React from 'react';
import ApplicationNavigator from '~navigation/ApplicationNavigator';
import log from '~startup/log';

const App: React.FC = () => {
  log('log', 'App', 'Rendering App');
  return <ApplicationNavigator />;
};

export default App;
