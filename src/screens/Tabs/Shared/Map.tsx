import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import ThemeText from '~components/widgets/ThemeText';
import {TabSharedStackScreenProps} from '~utils/navigation/navigators';
import mapStyles from './mapStyles.json';
import {useTheme} from '~utils/styles/ThemeManager';
import HeaderLeft from '~components/Header/Left';

const TabSharedMap: React.FC<TabSharedStackScreenProps<'Tab-Shared-Map'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();

  const [region] = useState({
    latitude: 16.833734,
    longitude: 96.167805,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
      headerTitle: () => (
        <ThemeText color={colors.textWhite}>Map</ThemeText>
      ),
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} region={region} customMapStyle={mapStyles} />
    </View>
  );
};

export default TabSharedMap;
