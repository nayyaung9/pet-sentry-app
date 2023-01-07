import React, {useEffect} from 'react';
import ApplicationNavigator from '~navigation/ApplicationNavigator';
import ThemeManager from '~utils/styles/ThemeManager';

import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '~utils/queryHooks';

import log from '~utils/startup/log';
import geolocation from '~utils/startup/geolocation';
import {GEOCODER_ENDPOINT, GEOCODER_KEY} from '@env';
import {useGeoState} from '~utils/states/geo.state';
import {useMapState} from '~utils/states/map.state';

const App: React.FC = () => {
  log('log', 'App', 'Rendering App');
  const setgeocoderLocation = useGeoState(state => state.setLocation);
  const setMapState = useMapState(state => state.setMapState);

  useEffect(() => {
    const mountBoot = async () => {
      try {
        const geolocationResponse = await geolocation();
        if (
          Array.isArray(geolocationResponse) &&
          geolocationResponse.length >= 1
        ) {
          const query = `${geolocationResponse[0]}, ${geolocationResponse[1]}`;

          setMapState({
            coordinates: {
              latitude: geolocationResponse[0],
              longitude: geolocationResponse[1],
            },
          });

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
            })
            .catch(err => console.log(err));
        }
      } catch {}

      // const loginCredentialToken = await getCredential();
      // if (loginCredentialToken) {
      //   setCredential(loginCredentialToken);
      // } else {
      //   setCredential(null);
      // }
    };

    mountBoot();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeManager>
        <ApplicationNavigator />
      </ThemeManager>
    </QueryClientProvider>
  );
};

export default App;
