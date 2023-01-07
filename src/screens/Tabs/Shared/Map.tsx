import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import ThemeText from '~components/widgets/ThemeText';
import {TabSharedStackScreenProps} from '~utils/navigation/navigators';
import mapStyles from './mapStyles.json';
import {useTheme} from '~utils/styles/ThemeManager';
import HeaderLeft from '~components/Header/Left';
import geolocation from '~utils/startup/geolocation';
import MapGenerateLabel from '~components/Shared/Map/MapGenerateLabel';

const initialRegion = {
  latitude: 16.833734,
  longitude: 96.167805,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const TabSharedMap: React.FC<TabSharedStackScreenProps<'Tab-Shared-Map'>> = ({
  navigation,
  route: {
    params: {isPin = false},
  },
}) => {
  const {colors} = useTheme();

  const [region, setRegion] = useState({
    latitude: 16.833734,
    longitude: 96.167805,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [pinPoint, setPinPoint] = useState({latitude: 0.0, longitude: 0.0});

  const onGetPinPointOnMap = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => setPinPoint({latitude, longitude});

  useEffect(() => {
    (async () => {
      const geolocationResponse: any = await geolocation();
      if (geolocationResponse) {
        setRegion({
          ...region,
          latitude: geolocationResponse[0],
          longitude: geolocationResponse[1],
        });
      }
    })();
  }, []);

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

  return (
    <View style={{flex: 1}}>
      {pinPoint && <MapGenerateLabel {...{pinPoint}} />}
      <MapView
        style={{flex: 1}}
        initialRegion={initialRegion}
        onPress={e => isPin && onGetPinPointOnMap(e.nativeEvent.coordinate)}
        region={region}
        customMapStyle={mapStyles}>
        {pinPoint && (
          <Marker
            coordinate={{
              latitude: pinPoint?.latitude,
              longitude: pinPoint?.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default TabSharedMap;
