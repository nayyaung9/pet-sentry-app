import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Gender from '~components/widgets/Gender';
import ThemeText from '~components/widgets/ThemeText';
import {TabPostParamList} from '~utils/navigation/navigators';
import {StyleConstants} from '~utils/styles/constants';
import FoundPetForm from './Widgets/FoundPetForm';
import MissingPetForm from './Widgets/MissingPetForm';

type ParamsProps = NativeStackScreenProps<TabPostParamList, 'Tab-Post-Form'>;

interface ComponentProps {
  [key: string]: React.ReactNode
}

const Form: ComponentProps = {
  missing: <MissingPetForm />,
  found: <FoundPetForm />
};

const PostForm = ({
  route: {
    params: {actionType},
  },
}: ParamsProps) => {
  return (
    <View style={styles.root}>
        {Form[actionType]}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: StyleConstants.Spacing.Global.PagePadding,
  },
});

export default PostForm;
