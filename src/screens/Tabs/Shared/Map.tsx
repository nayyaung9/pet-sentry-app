import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import ThemeText from '~components/widgets/ThemeText';
import {TabSharedStackScreenProps} from '~utils/navigation/navigators';
import mapStyles from './mapStyles.json';
import {useTheme} from '~utils/styles/ThemeManager';
import HeaderLeft from '~components/Header/Left';
import MapGenerateLabel from '~components/Shared/Map/MapGenerateLabel';
import {useMapState} from '~utils/states/map.state';

const initialRegion = {
  latitude: 16.833734,
  longitude: 96.167805,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const TabSharedMap: React.FC<TabSharedStackScreenProps<'Tab-Shared-Map'>> = ({
  navigation,
  route: {
    params: {isPin = false, point},
  },
}) => {
  const {colors} = useTheme();
  const setMapState = useMapState(state => state.setMapState);

  const [region] = useState({
    latitude: point?.latitude,
    longitude: point?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [pinPoint, setPinPoint] = useState({
    latitude: point?.latitude as number,
    longitude: point?.longitude as number,
  });

  const onGetPinPointOnMap = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => setPinPoint({latitude, longitude});

  useEffect(() => {
    navigation.setOptions({
      presentation: 'modal',
      headerShadowVisible: false,
      headerStyle: {backgroundColor: colors.primary},
      headerBackVisible: false,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <HeaderLeft
          content={'md-arrow-back'}
          onPress={() => navigation.pop(1)}
          color={colors.textWhite}
        />
      ),
      headerTitle: () => <ThemeText color={colors.textWhite}>Map</ThemeText>,
    });
  }, []);

  const onConfirmLocationPoints = (location: string) => {
    setMapState({
      address: location,
      coordinates: {
        latitude: pinPoint?.latitude as number,
        longitude: pinPoint?.longitude as number,
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      {isPin && (
        <MapGenerateLabel
          {...{
            pinPoint,
            getMapInfo: (mapAddress: string) =>
              onConfirmLocationPoints(mapAddress),
          }}
        />
      )}
      <MapView
        style={{flex: 1}}
        initialRegion={initialRegion}
        onPress={e => isPin && onGetPinPointOnMap(e.nativeEvent.coordinate)}
        region={region}
        customMapStyle={mapStyles}>
        {pinPoint && (
          <Marker
            coordinate={{
              latitude: pinPoint?.latitude as number,
              longitude: pinPoint?.longitude as number,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default TabSharedMap;
