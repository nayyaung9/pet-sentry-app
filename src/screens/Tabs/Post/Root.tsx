import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '~components/widgets/Button';
import {TabPostParamList} from '~utils/navigation/navigators';
import {StyleConstants} from '~utils/styles/constants';

const activities = [
  {id: 1, label: 'Report Missing', type: 'missing'},
  {id: 2, label: 'Report Found', type: 'found'},
];

const Post: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<TabPostParamList>>();
  return (
    <View style={styles.root}>
      {activities?.map((activity, index) => (
        <Button
          key={index}
          title={activity?.label}
          onPress={() =>
            navigation.navigate('Tab-Post-Form', {actionType: activity?.type})
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: StyleConstants.Spacing.Global.PagePadding,
  },
});
export default Post;
