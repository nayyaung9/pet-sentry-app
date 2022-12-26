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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from '~components/Avatar';

const DEVICE = Dimensions.get('window');

const TimelineDetail = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={styles.petImageContainer}
        source={require('~assets/images/pet_demo.jpg')}
      />

      <View style={styles.contentContainer}>
        <View style={styles.petInfoCardRow}>
          <ThemeText fontStyle={'L'}>Lu Soe Kg</ThemeText>
        </View>
        <View style={styles.petInfoCardRow}>
          <ThemeText color={colors.textSecondary}>
            <Ionicons name="md-location" />
            Tarmwe, Yangon
          </ThemeText>
        </View>
        <View style={{marginBottom: StyleConstants.Spacing.M}}>
          <ThemeText fontStyle={'L'}>Description</ThemeText>
          <ThemeText color={'rgba(0, 0, 0, 0.7)'}>
            escape from their homes or yards, get lost during a move or
            vacation, or become separated from their owners during a natural
            disaster or other emergency. Pets may also become lost if they are
            stolen or if they wander off while out on a walk or hike. It is
            important for pet owners to take steps to prevent their pets from
            becoming lost, such as
          </ThemeText>
        </View>
        <View style={{marginBottom: StyleConstants.Spacing.M}}>
          <ThemeText fontStyle={'L'}>Owner Info</ThemeText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: StyleConstants.Spacing.S,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Avatar
                src={
                  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                }
              />
              <ThemeText
                style={{marginLeft: StyleConstants.Spacing.S}}
                fontWeight={'Medium'}>
                Nay Yaung Lin Lakk
              </ThemeText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="md-chatbubbles-outline"
                size={24}
                color={colors.primary}
                style={{marginRight: 16}}
              />
              <Ionicons
                name="md-call-outline"
                size={24}
                color={colors.primary}
              />
            </View>
          </View>
        </View>
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
    marginBottom: StyleConstants.Spacing.XS,
  },
  contentContainer: {
    flexGrow: 1,
    padding: StyleConstants.Spacing.Global.PagePadding,
  },
});
export default TimelineDetail;
