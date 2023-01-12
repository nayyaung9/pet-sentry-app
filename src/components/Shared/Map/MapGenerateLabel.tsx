import React from 'react';
import ThemeText from '~components/widgets/ThemeText';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import Button from '~components/widgets/Button';
import {useNavigation} from '@react-navigation/native';
import {useGeocodingQuery} from '~utils/queryHooks/geocoding';
import Ionicons from 'react-native-vector-icons/Ionicons';

const device = Dimensions.get('window');

type MapGenerateLabelProps = {
  pinPoint: PetSentry.CoordinatesProps;
  getMapInfo: (mapAddress: string) => void;
};

const MapGenerateLabel = ({pinPoint, getMapInfo}: MapGenerateLabelProps) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const query = `${pinPoint?.latitude}, ${pinPoint?.longitude}`;

  const {isLoading, data} = useGeocodingQuery({
    coordinates: query,
  });

  const onConfirmMapInfo = () => {
    if (data) {
      getMapInfo(data);
      navigation.goBack();
    }
  };

  return (
    <>
      <View style={styles.mapSearchView}>
        <View style={styles.mapSearchHeader}>
          {isLoading && (
            <View style={{position: 'absolute', zIndex: 9, left: 16, top: 10}}>
              <ActivityIndicator color={colors.primary} size={'large'} />
            </View>
          )}
          <ThemeText
            style={{flex: 1}}
            color={isLoading ? colors.textDisable : '#000'}
            numberOfLines={1}>
            {data || 'Please pin your location on map.'}
          </ThemeText>
          <Pressable
            disabled={isLoading || data == ''}
            onPress={onConfirmMapInfo}
            children={() => (
              <Ionicons name="md-close" color={'#ddd'} size={18} />
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mapSearchView: {
    position: 'absolute',
    top: 60,
    zIndex: 9,
    width: '100%',
    alignItems: 'center',
  },
  mapSearchHeader: {
    width: device?.width - 48,
    padding: StyleConstants.Spacing.M,
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chooseButton: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 9,
  },
});

export default MapGenerateLabel;
