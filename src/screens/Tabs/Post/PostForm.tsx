import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View, BackHandler} from 'react-native';
import {TabPostParamList} from '~utils/navigation/navigators';
import {StyleConstants} from '~utils/styles/constants';
import {useMapState} from '~utils/states/map.state';

import FoundPetForm from './Widgets/FoundPetForm';
import MissingPetForm from './Widgets/MissingPetForm';
import shallow from 'zustand/shallow';

type ParamsProps = NativeStackScreenProps<TabPostParamList, 'Tab-Post-Form'>;

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
  const [setMapState, addressName] = useMapState(
    state => [state.setMapState, state.addressName],
    shallow,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setMapState({
          coordinates: {latitude: null, longitude: null},
          address: null,
        });
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [addressName]),
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
