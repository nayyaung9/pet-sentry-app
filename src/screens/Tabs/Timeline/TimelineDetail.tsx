import React from 'react';
import {
  Dimensions,
  ImageBackground,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import {
  TabTimelineParamList,
  TabTimelineStackScreenProps,
} from '~utils/navigation/navigators';
import {useTimelineDetailQuery} from '~utils/queryHooks/timeline';
import moment from 'moment';
import PetOwner from '~components/PetOwner';
import MenuRow from '~components/MenuRow';

const DEVICE = Dimensions.get('window');

const TimelineDetail: React.FC<
  TabTimelineStackScreenProps<'Tab-Timeline-Detail'>
> = ({
  route: {
    params: {petId},
  },
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();

  const {data, isLoading, error} = useTimelineDetailQuery({
    id: petId,
  });

  const isOwnerExist = data?._owner && Object.keys(data?._owner).length > 1;
  console.log('data', JSON.stringify(data, null, 2));
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
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
        style={{flex: 1, backgroundColor: colors.primary}}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.petImageContainer}
          source={require('~assets/images/pet_demo.jpg')}
        />

        <View style={styles.contentContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={'#fff'} size={'large'} />
            </View>
          ) : (
            <>
              <View
                style={[
                  styles.petInfoCardRow,
                  {
                    backgroundColor: colors.primary,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                  },
                ]}>
                <ThemeText
                  style={{flex: 1}}
                  fontStyle={'L'}
                  numberOfLines={2}
                  color={'#fff'}>
                  {data?.petName}
                </ThemeText>
                <ThemeText color={'#fff'}>{data?.activityType}</ThemeText>
              </View>

              <View style={styles.cardContainer}>
                <ThemeText color={'#fff'} fontStyle={'S'}>
                  Basic Info
                </ThemeText>

                <View style={styles.card}>
                  <MenuRow
                    isDisable={true}
                    icon={
                      <MaterialCommunityIcons
                        name="gender-male-female"
                        size={24}
                        color={colors.primary}
                      />
                    }
                    label="Gender"
                    value={data?.gender ? 'Male' : 'Female'}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                  />

                  <MenuRow
                    isDisable={true}
                    icon={
                      <Ionicons
                        name="md-calendar-outline"
                        size={24}
                        color={colors.primary}
                      />
                    }
                    label="Lost date"
                    value={moment(data?.createdAt).format('MMM DDD YYYY')}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                  />

                  {data?.collarColor != '' && (
                    <>
                      <MenuRow
                        isDisable={true}
                        icon={
                          <FontAwesome
                            name="paw"
                            size={24}
                            color={colors.primary}
                          />
                        }
                        label="Collar color"
                        value={data?.collarColor}
                      />
                    </>
                  )}
                </View>
              </View>

              <View style={styles.cardContainer}>
                <ThemeText color={'#fff'} fontStyle={'S'}>
                  {data?.activityType === 'Missing' ? 'Missing' : 'Found'} Info
                </ThemeText>
                <View
                  style={[
                    styles.card,
                    {paddingVertical: StyleConstants.Spacing.S},
                  ]}>
                  {data?.geolocation?.address != '' && (
                    <View style={{marginBottom: StyleConstants.Spacing.S}}>
                      <ThemeText
                        color={colors.textSecondary}
                        fontStyle={'XS'}
                        style={{marginBottom: StyleConstants.Spacing.S}}>
                        Missing here
                      </ThemeText>
                      <ThemeText>{data?.geolocation?.address}</ThemeText>
                    </View>
                  )}

                  {data?.information != '' && (
                    <View style={{marginBottom: StyleConstants.Spacing.S}}>
                      <ThemeText
                        color={colors.textSecondary}
                        fontStyle={'XS'}
                        style={{marginBottom: StyleConstants.Spacing.S}}>
                        Information
                      </ThemeText>
                      <ThemeText>{data?.information}</ThemeText>
                    </View>
                  )}

                  {data?.specialTraits != '' && data?.specialTraits != null && (
                    <View>
                      <ThemeText
                        color={colors.textSecondary}
                        fontStyle={'XS'}
                        style={{marginBottom: StyleConstants.Spacing.S}}>
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
              <View style={styles.card}>
                <PetOwner
                  {...{
                    ownerName: data?._owner?.fullname,
                    ownerProfile: data?._owner?.profileUrl,
                  }}
                />
              </View>
            </View>
          )}
          {/* Pet Owner Component */}

          <Button
            title="View on Map"
            icon={'md-map'}
            onPress={() =>
              navigation.navigate('Tab-Shared-Map', {isPin: false})
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
    top: 40,
    zIndex: 9,
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
    height: DEVICE.height / 2.3,
  },
  petInfoCardRow: {
    flexDirection: 'column',
    paddingHorizontal: StyleConstants.Spacing.M,
    paddingVertical: StyleConstants.Spacing.S,
  },
  contentContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    paddingHorizontal: StyleConstants.Spacing.M,
    paddingVertical: StyleConstants.Spacing.S,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: StyleConstants.Spacing.S,
    paddingHorizontal: StyleConstants.Spacing.M,
  },
});
export default TimelineDetail;
