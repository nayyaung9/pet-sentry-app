import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, BackHandler} from 'react-native';
import {RootStackScreenProps} from '~utils/navigation/navigators';
import {StyleConstants} from '~utils/styles/constants';

import FoundPetForm from './Widgets/FoundPetForm';
import MissingPetForm from './Widgets/MissingPetForm';
import shallow from 'zustand/shallow';
import {useGeoState} from '~utils/states/geo.state';
import {useMapState} from '~utils/states/map.state';

type ParamsProps = RootStackScreenProps<'Timeline-Post-Form'>;

interface ComponentProps {
  [key: string]: React.ReactNode;
}

const Form: ComponentProps = {
  missing: <MissingPetForm />,
  found: <FoundPetForm />,
};

const PostForm = ({
  route: {
    params: {actionType},
  },
}: ParamsProps) => {
  const [userAddress, userCoordinates] = useGeoState(
    state => [state.userAddress, state.userCoordinates],
    shallow,
  );

  const setMapState = useMapState(state => state.setMapState);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setMapState({
          coordinates: {
            latitude: userCoordinates?.latitude as number,
            longitude: userCoordinates?.longitude as number,
          },
          address: userAddress,
        });
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [userAddress, userCoordinates]),
  );

  return <View style={styles.root}>{Form[actionType]}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: StyleConstants.Spacing.Global.PagePadding,
  },
});

export default PostForm;
