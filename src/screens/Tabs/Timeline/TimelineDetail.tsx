import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Button from '~components/widgets/Button';
import ThemeText from '~components/widgets/ThemeText';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import {TabTimelineParamList} from '~utils/navigation/navigators';

const DEVICE = Dimensions.get('window');

const TimelineDetail = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors.background}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={styles.petImageContainer}
        source={require('~assets/images/pet_demo.jpg')}
      />

      <View style={styles.contentContainer}>
        <View style={styles.petInfoCardRow}>
          <ThemeText fontStyle={'L'}>Lu Soe Kg</ThemeText>
          <ThemeText>Lu Soe Kg</ThemeText>
        </View>
        <View style={styles.petInfoCardRow}>
          <ThemeText>Tarmwe, Yangon</ThemeText>
          <ThemeText>Lu Soe Kg</ThemeText>
        </View>
        <View style={styles.petInfoCardRow}>
          <ThemeText>Lu Soe Kg</ThemeText>
          <ThemeText>Lu Soe Kg</ThemeText>
        </View>
        <ThemeText>Description</ThemeText>
        <ThemeText>
          escape from their homes or yards, get lost during a move or vacation,
          or become separated from their owners during a natural disaster or
          other emergency. Pets may also become lost if they are stolen or if
          they wander off while out on a walk or hike. It is important for pet
          owners to take steps to prevent their pets from becoming lost, such as
          keeping them securely contained at home and on a leash when outside,
          microchipping them, and ensuring that they always wear identification
          tags. If a pet does become lost, it is important to act quickly to try
          to locate them and to reach becoming lost, such as keeping them
          securely contained at home and on a leash when outside, microchipping
          them, and ensuring that they always wear identification tags. If a pet
          does become lost, it is important to act quickly to try to locate them
          and to reach important to act quickly to try to locate them and to
          reach becoming lost, such as keeping them securely contained at home
          and on a leash when outside, microchipping them, and ensuring that
          they always wear identification tags. If a pet does become lost, it is
          important to act quickly to try to locate them and to reach
        </ThemeText>

        <Button
          title="View on Map"
          icon={'md-map'}
          onPress={() => navigation.navigate('Tab-Timeline-Map')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  petImageContainer: {
    width: '100%',
    height: DEVICE.height / 2,
  },
  petInfoCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexGrow: 1,
    padding: StyleConstants.Spacing.Global.PagePadding,
  },
});
export default TimelineDetail;
