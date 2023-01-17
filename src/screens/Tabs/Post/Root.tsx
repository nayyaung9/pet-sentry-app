import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '~components/widgets/Button';
import {RootStackScreenProps} from '~utils/navigation/navigators';
import {StyleConstants} from '~utils/styles/constants';

const activities = [
  {id: 1, label: 'Report Missing', type: 'missing'},
  {id: 2, label: 'Report Found', type: 'found'},
];

const Post: React.FC = ({
  navigation,
}: RootStackScreenProps<'Timeline-Post-Form'>) => {
  return (
    <View style={styles.root}>
      {activities?.map((activity, index) => (
        <Button
          key={index}
          title={activity?.label}
          onPress={() =>
            navigation.navigate('Timeline-Post-Form', {
              actionType: activity?.type,
            })
          }
          style={{width: '100%'}}
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
