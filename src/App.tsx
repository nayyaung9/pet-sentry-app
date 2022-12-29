import React, {useEffect} from 'react';
import ApplicationNavigator from '~navigation/ApplicationNavigator';

import ThemeManager from '~utils/styles/ThemeManager';

import log from '~utils/startup/log';
import geolocation from '~utils/startup/geolocation';
import {GEOCODER_ENDPOINT, GEOCODER_KEY} from '@env';
import {useGeoState} from '~utils/states/geo.state';

const App: React.FC = () => {
  log('log', 'App', 'Rendering App');
  const setgeocoderLocation = useGeoState(state => state.setLocation);

  useEffect(() => {
    const mountBoot = async () => {
      try {
        const geolocationResponse = await geolocation();
        if (
          Array.isArray(geolocationResponse) &&
          geolocationResponse.length >= 1
        ) {
          const query = `${geolocationResponse[0]}, ${geolocationResponse[1]}`;

          fetch(
            `${GEOCODER_ENDPOINT}?q=${query}&key=${GEOCODER_KEY}&language=en&pretty=1`,
            {
              method: 'GET',
            },
          )
            .then(res => res.json())
            .then(response => {
              const {results} = response;
              const {state, suburb} = results[0] && results[0]?.components;
              const isTownshipAvailable = suburb || '';

              const geoCodedLocation = `${isTownshipAvailable}${
                isTownshipAvailable && ','
              }${state || ''}`;
              setgeocoderLocation(geoCodedLocation);
            });
        }
      } catch {}
    };

    mountBoot();
  }, []);

  return (
    <ThemeManager>
      <ApplicationNavigator />
    </ThemeManager>
  );
};

export default App;
