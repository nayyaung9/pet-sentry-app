import Geolocation from '@react-native-community/geolocation';
import log from './log';

const geolocation = async () => {
  log('log', 'Geolocation', 'initializing');

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve([latitude, longitude]);
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};

export default geolocation;
