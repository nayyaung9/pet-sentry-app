import React from 'react';
import ApplicationNavigator from '~navigation/ApplicationNavigator';
import ThemeManager from '~utils/styles/ThemeManager';
import log from '~startup/log';

const App: React.FC = () => {
  log('log', 'App', 'Rendering App');
  return (
    <ThemeManager>
      <ApplicationNavigator />
    </ThemeManager>
  );
};

export default App;
