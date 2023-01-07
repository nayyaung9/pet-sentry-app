import React, {useEffect, useState} from 'react';
import ThemeText from '~components/widgets/ThemeText';
import {StyleSheet, View, Dimensions} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {GEOCODER_ENDPOINT, GEOCODER_KEY} from '@env';
import {useTheme} from '~utils/styles/ThemeManager';
import Button from '~components/widgets/Button';
import {useNavigation} from '@react-navigation/native';

const device = Dimensions.get('window');

type MapGenerateLabelProps = {
  pinPoint: {
    latitude: number;
    longitude: number;
  };
  getMapInfo: (mapAddress: string) => void;
};

const MapGenerateLabel = ({pinPoint, getMapInfo}: MapGenerateLabelProps) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pinPoint?.latitude != 0 && pinPoint?.longitude != 0) {
      setLoading(true);
      const query = `${pinPoint?.latitude}, ${pinPoint?.longitude}`;
      fetch(
        `${GEOCODER_ENDPOINT}?q=${query}&key=${GEOCODER_KEY}&language=en&pretty=1`,
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .then(response => {
          const {results} = response;
          const {suburb} = results[0] && results[0]?.components;
          const residential =
            (results[0] && results[0]?.components?.residential) || '';
          const formattedAddress = results[0]?.formatted;
          const geocodingAddress = `${suburb},${residential}${formattedAddress}`;
          setLoading(false);
          setLocation(geocodingAddress);
        })
        .catch(err => setLoading(false));
    }
  }, [pinPoint]);

  const onConfirmMapInfo = () => {
    getMapInfo(location);
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.chooseButton}>
        <Button
          title="Confirm"
          disabled={loading || location == ""}
          onPress={onConfirmMapInfo}
          style={{paddingHorizontal: StyleConstants.Spacing.M}}
        />
      </View>
      <View style={styles.container}>
        <ThemeText color={loading ? colors.textDisable : '#000'}>
          {location || 'Please pin your location on map.'}
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
