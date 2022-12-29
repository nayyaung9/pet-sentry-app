import React, { useEffect } from 'react';
import ApplicationNavigator from '~navigation/ApplicationNavigator';

import ThemeManager from '~utils/styles/ThemeManager';

import log from '~utils/startup/log';
import geolocation from '~utils/startup/geolocation';

const App: React.FC = () => {
  log('log', 'App', 'Rendering App');

  useEffect(() => {
    const mountBoot = async () => {
      try {
        const geolocationResponse = await geolocation();
        console.log("geolocationResponse", geolocationResponse)
      } catch {}
    }

    mountBoot();
  }, []);

  return (
    <ThemeManager>
      <ApplicationNavigator />
    </ThemeManager>
  );
};

export default App;
