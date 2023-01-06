import React, {useState} from 'react';
import MapView from 'react-native-maps';
import mapStyles from './mapStyles.json';

const TabSharedMap: React.FC= () => {
  const [region] = useState({
    latitude: 16.833734,
    longitude: 96.167805,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <MapView style={{flex: 1}} region={region} customMapStyle={mapStyles} />
  );
};

export default TabSharedMap;
