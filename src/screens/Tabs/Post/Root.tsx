import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import {RootStackScreenProps} from '~utils/navigation/navigators';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';

const activities = [
  {
    id: 1,
    title: 'Have you lost your pet? submit help here!',
    label: 'Report Missing',
    type: 'missing',
    icon: require('~assets/images/missing-pet.png'),
    isDisabled: false,
  },
  {
    id: 2,
    title: "Have you found somebody's pet & want to get a home?",
    label: 'Report Found',
    type: 'found',
    icon: require('~assets/images/found-pet.png'),
    isDisabled: false,
  },
  {
    id: 3,
    title: 'Have you see the recuse animals? Hurry up & save it.',
    label: 'Report Found',
    type: 'found',
    icon: require('~assets/images/found-pet.png'),
    isDisabled: true,
  },
];

const Post: React.FC = ({
  navigation,
}: RootStackScreenProps<'Timeline-Post-Form'>) => {
  const {colors} = useTheme();
  return (
    <View style={styles.root}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemeText color={'#fff'} fontStyle={'L'}>Activities</ThemeText>
      </View>
      <View style={styles.container}>
        {activities?.map((activity, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Timeline-Post-Form', {
                actionType: activity?.type,
              })
            }
            disabled={activity?.isDisabled}
            key={index}
            style={[
              styles.activityButton,
              {
                backgroundColor: activity?.isDisabled
                  ? 'rgba(236, 65, 122, 0.2)'
                  : colors.primary,
              },
            ]}>
            <ThemeText fontStyle={'L'} fontWeight={'Medium'} color={'#fff'}>
              {activity?.title}
            </ThemeText>
            <ThemeText color={'#fff'}>{activity?.label}</ThemeText>
            <Image
              source={activity?.icon}
              style={[
                styles.activityIcon,
                {
                  ...(activity?.isDisabled && {
                    tintColor: 'rgba(0, 0, 0, 0.2)',
                  }),
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: StyleConstants.Spacing.S,
    paddingHorizontal: StyleConstants.Spacing.M,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: StyleConstants.Spacing.Global.PagePadding,
  },
  activityButton: {
    height: 120,
    paddingVertical: StyleConstants.Spacing.M,
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: StyleConstants.Spacing.S,
    borderRadius: 5,
    paddingHorizontal: StyleConstants.Spacing.M,
  },
  activityIcon: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 16,
    bottom: 12,
  },
});
export default Post;
