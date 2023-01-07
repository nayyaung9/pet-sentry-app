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
};
const MapGenerateLabel = ({pinPoint}: MapGenerateLabelProps) => {
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

  return (
    <>
      <View style={styles.container}>
        <ThemeText color={loading ? colors.textDisable : '#000'}>
          {location || 'Please pin your location on map.'}
        </ThemeText>
      </View>

      <View style={styles.manualLocationView}>
        <Button
          title="Or enter your address here"
          onPress={() => navigation.goBack()}
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
    top: 60,
    zIndex: 9,
    elevation: 2,
  },
  manualLocationView: {
    position: 'absolute',
    bottom: 10,
    zIndex: 9,
    right: 16,
  },
});

export default MapGenerateLabel;
