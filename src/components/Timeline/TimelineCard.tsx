import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {TabTimelineParamList} from '~utils/navigation/navigators';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '~utils/styles/ThemeManager';
import {StyleConstants} from '~utils/styles/constants';
import moment from 'moment';

const TimelineCard = ({item}: {item: any}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('Tab-Timeline-Detail', {
          pet: item,
        })
      }
      style={[
        styles.timelineCard,
        {
          marginBottom: StyleConstants.Spacing.M,
        },
      ]}>
      <FastImage
        style={styles.timelineImage}
        source={{
          uri: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.timelineCardContent}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ThemeText fontStyle="L" fontWeight={'Medium'} color={colors.primary}>
            {item?.petName}
          </ThemeText>
          <ThemeText fontStyle={'XS'} color={'rgba(0, 0, 0, 0.6)'}>
            {moment(item?.createdAt).format('MMM, DDD, YYYY')}
          </ThemeText>
        </View>

        {(item?.comment || item?.specialTraits) && (
          <ThemeText fontStyle={'S'} fontWeight={'Light'} numberOfLines={2}>
            {item?.comment || item?.specialTraits}
          </ThemeText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timelineCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 16,
  },
  timelineImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    elevation: 4,
  },
  timelineCardContent: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
});

export default TimelineCard;
