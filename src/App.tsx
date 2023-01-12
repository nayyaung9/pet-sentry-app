import React, {useEffect} from 'react';
import ApplicationNavigator from '~navigation/ApplicationNavigator';

import ThemeManager from '~utils/styles/ThemeManager';
import log from '~utils/startup/log';

import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '~utils/queryHooks';
import geolocation from '~utils/startup/geolocation';

import axios from 'axios';
import {GEOCODER_ENDPOINT, GEOCODER_KEY} from '@env';

import {useGeoState} from '~utils/states/geo.state';
import {useMapState} from '~utils/states/map.state';
import shallow from 'zustand/shallow';

const App: React.FC = () => {
  log('log', 'App', 'Rendering App');
  const [setgeocoderLocation, setUserAddress, setUserCoordinates] = useGeoState(
    state => [
      state.setLocation,
      state.setUserAddress,
      state.setUserCoordinates,
    ],
    shallow,
  );
  const setMapState = useMapState(state => state.setMapState);

  useEffect(() => {
    const mountBoot = async () => {
      try {
        const geolocationResponse = await geolocation();
        if (
          Array.isArray(geolocationResponse) &&
          geolocationResponse.length >= 1
        ) {
          const coordinateQuery = `${geolocationResponse[0]}, ${geolocationResponse[1]}`;

          const {data: response} = await axios.get(
            `${GEOCODER_ENDPOINT}?q=${coordinateQuery}&key=${GEOCODER_KEY}&language=en&pretty=1`,
          );

          if (response) {
            const {results} = response;
            const {state, suburb} = results[0] && results[0]?.components;
            const isTownshipAvailable = suburb || '';
            const geoCodedLocation = `${isTownshipAvailable}${
              isTownshipAvailable && ','
            }${state || ''}`;
            setgeocoderLocation(geoCodedLocation);

            const residential =
              (results[0] && results[0]?.components?.residential) || '';
            const formattedAddress = results[0]?.formatted;
            const geocodedAddress = `${suburb},${residential}${formattedAddress}`;
            setUserAddress(geocodedAddress);
            setUserCoordinates({
              latitude: geolocationResponse[0],
              longitude: geolocationResponse[1],
            });
            setMapState({
              address: geocodedAddress,
              coordinates: {
                latitude: geolocationResponse[0],
                longitude: geolocationResponse[1],
              },
            });
          }
        }
      } catch {}
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
