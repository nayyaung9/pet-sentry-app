import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import NeatlyImage from '~components/widgets/NeatlyImage';
import Avatar from '~components/Avatar';

import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '~utils/navigation/navigators';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '~utils/styles/ThemeManager';
import {StyleConstants} from '~utils/styles/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {extractShortLocation} from '~utils/helpers/extractShortLocation';

const TimelineCard = ({item}: {item: any}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Timeline-Detail'>>();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('Timeline-Detail', {
          petId: item?._id,
        })
      }
      style={[
        styles.timelineCard,
        {
          marginBottom: StyleConstants.Spacing.M,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: StyleConstants.Spacing.M,
        }}>
        <Avatar src={item?._owner?.profileUrl} />
        <View style={{marginLeft: StyleConstants.Spacing.S}}>
          <ThemeText>{item?._owner?.fullname}</ThemeText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name="md-location"
              size={14}
              color={'rgba(0, 0, 0, 0.7)'}
            />
            <ThemeText fontStyle={'XS'} fontWeight={'Medium'} color={'rgba(0, 0, 0, 0.4)'}>
              {extractShortLocation(item?.geolocation?.address)}
            </ThemeText>
          </View>
        </View>
      </View>

      {Array.isArray(item?.photos) && item?.photos?.length >= 1 && (
        <NeatlyImage
          uri={{
            remote: item?.photos[0]?.url,
          }}
          imageStyle={styles.timelineImage}
          blurHash={item?.photos[0]?.blurHashValue}
          containerStyle={styles.timelineCardImageBlurHashContainer}
        />
      )}

      <View style={styles.timelineCardContent}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: StyleConstants.Spacing.S
          }}>
          <ThemeText fontStyle="M" fontWeight={'Medium'} color={colors.primary}>
            {item?.petName}
          </ThemeText>
          <ThemeText fontStyle={'XS'} color={'rgba(0, 0, 0, 0.6)'}>
            {moment(item?.createdAt).format('MMM, DDD, YYYY')}
          </ThemeText>
        </View>

        {(item?.information || item?.specialTraits) && (
          <ThemeText numberOfLines={2} color={"rgba(0, 0, 0, 0.4)"}>
            {item?.information || item?.specialTraits}
          </ThemeText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timelineCard: {
    backgroundColor: '#fff',
    padding: StyleConstants.Spacing.M,
  },
  timelineImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    elevation: 4,
  },
  timelineCardContent: {
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  timelineCardImageBlurHashContainer: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default TimelineCard;
