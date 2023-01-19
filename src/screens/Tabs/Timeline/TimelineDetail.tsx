import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  Pressable,
} from 'react-native';
import Button from '~components/widgets/Button';
import ThemeText from '~components/widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import {RootStackScreenProps} from '~utils/navigation/navigators';
import {useTimelineDetailQuery} from '~utils/queryHooks/timeline';
import moment from 'moment';
import PetOwner from '~components/PetOwner';
import NeatlyImage from '~components/widgets/NeatlyImage';
import {extractShortLocation} from '~utils/helpers/extractShortLocation';
import IconLabel from '~components/widgets/IconLabel';

const DEVICE = Dimensions.get('window');

const TimelineDetail: React.FC<RootStackScreenProps<'Timeline-Detail'>> = ({
  route: {
    params: {petId},
  },
  navigation,
}) => {
  const {colors} = useTheme();

  const {data, isLoading, error} = useTimelineDetailQuery({
    id: petId,
  });

  const isOwnerExist = data?._owner && Object.keys(data?._owner).length > 1;
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          children={() => (
            <Ionicons name="md-arrow-back" color={'#000'} size={20} />
          )}
          style={styles.backButton}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: StyleConstants.Spacing.M,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        {data?.photos?.length >= 1 && (
          <NeatlyImage
            uri={{
              remote: data?.photos[0]?.url,
            }}
            imageStyle={styles.petImageContainer}
            blurHash={data?.photos[0]?.blurHashValue}
          />
        )}

        <View style={styles.contentContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={'#fff'} size={'large'} />
            </View>
          ) : (
            <>
              <View style={styles.petInfoCardRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <ThemeText
                    style={{flex: 1}}
                    fontWeight={'Medium'}
                    fontStyle={'L'}
                    numberOfLines={2}>
                    {data?.petName}
                  </ThemeText>

                  <IconLabel
                    iconComponent={Feather}
                    iconName={'eye'}
                    label={24}
                    containerStyle={{justifyContent: 'flex-end'}}
                    labelStyle={{paddingLeft: StyleConstants.Spacing.S - 2}}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <IconLabel
                    iconComponent={Ionicons}
                    iconName={'location-outline'}
                    label={extractShortLocation(data?.geolocation?.address)}
                  />
                  <ThemeText fontStyle={'S'}>{data?.activityType}</ThemeText>
                </View>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.basicInfoRow}>
                  <View style={{flex: 1}}>
                    <ThemeText color={colors.textSecondary} fontStyle={'XS'}>
                      Gender
                    </ThemeText>
                    <ThemeText>{data?.gender ? 'Male' : 'Female'}</ThemeText>
                  </View>
                  <View style={{flex: 1}}>
                    <ThemeText color={colors.textSecondary} fontStyle={'XS'}>
                      Lost Date
                    </ThemeText>
                    <ThemeText>
                      {moment(data?.createdAt).format('MMM DDD YYYY')}
                    </ThemeText>
                  </View>
                  <View style={{flex: 1}}>
                    <ThemeText color={colors.textSecondary} fontStyle={'XS'}>
                      Collar color
                    </ThemeText>
                    <ThemeText>{data?.collarColor}</ThemeText>
                  </View>
                </View>
              </View>

              <View style={styles.cardContainer}>
                <View>
                  {data?.geolocation?.address != '' && (
                    <View style={{marginBottom: StyleConstants.Spacing.S}}>
                      <ThemeText color={colors.textSecondary} fontStyle={'XS'}>
                        Missing here
                      </ThemeText>
                      <ThemeText>{data?.geolocation?.address}</ThemeText>
                    </View>
                  )}

                  {data?.information != '' && (
                    <View style={{marginBottom: StyleConstants.Spacing.S}}>
                      <ThemeText color={colors.textSecondary} fontStyle={'XS'}>
                        Information
                      </ThemeText>
                      <ThemeText>{data?.information}</ThemeText>
                    </View>
                  )}

                  {data?.specialTraits != '' && data?.specialTraits != null && (
                    <View>
                      <ThemeText color={colors.textSecondary} fontStyle={'XS'}>
                        Special Traits
                      </ThemeText>
                      <ThemeText>{data?.specialTraits}</ThemeText>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}

          {/* Pet Owner Component */}
          {isOwnerExist && (
            <View style={styles.cardContainer}>
              <PetOwner
                {...{
                  ownerName: data?._owner?.fullname,
                  ownerProfile: data?._owner?.profileUrl,
                }}
              />
            </View>
          )}
          {/* Pet Owner Component */}

          <Button
            title="View on Map"
            icon={'md-map'}
            onPress={() =>
              navigation.navigate('Map', {
                isPin: false,
                point: {
                  latitude: data?.geolocation?.coordinates[1],
                  longitude: data?.geolocation?.coordinates[0],
                },
              })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 30,
    zIndex: 9,
    paddingHorizontal: StyleConstants.Spacing.S,
    marginHorizontal: StyleConstants.Spacing.M,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  petImageContainer: {
    width: '100%',
    height: DEVICE.height / 2.6,
    borderRadius: 20,
  },
  petInfoCardRow: {
    flexDirection: 'column',
    paddingVertical: StyleConstants.Spacing.S,
  },
  contentContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    paddingVertical: StyleConstants.Spacing.S,
  },
  basicInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default TimelineDetail;
