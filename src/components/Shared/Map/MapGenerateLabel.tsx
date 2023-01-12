import React from 'react';
import ThemeText from '~components/widgets/ThemeText';
import {StyleSheet, View, Dimensions} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import Button from '~components/widgets/Button';
import {useNavigation} from '@react-navigation/native';
import {useGeocodingQuery} from '~utils/queryHooks/geocoding';

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
      <View style={styles.chooseButton}>
        <Button
          title="Confirm"
          disabled={isLoading || data == ''}
          onPress={onConfirmMapInfo}
          style={{paddingHorizontal: StyleConstants.Spacing.M}}
        />
      </View>
      <View style={styles.container}>
        <ThemeText color={isLoading ? colors.textDisable : '#000'}>
          {data || 'Please pin your location on map.'}
        </ThemeText>
      </View>

      <View style={styles.manualLocationView}>
        <Button
          title="Or enter your address here"
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: StyleConstants.Spacing.M}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: device?.width - 32,
    marginHorizontal: StyleConstants.Spacing.M,
    padding: StyleConstants.Spacing.S,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 80,
    zIndex: 9,
    elevation: 2,
  },
  manualLocationView: {
    position: 'absolute',
    bottom: 10,
    zIndex: 9,
    right: 16,
  },
  chooseButton: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 9,
  },
});

export default MapGenerateLabel;
