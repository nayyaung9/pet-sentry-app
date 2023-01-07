import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Button from '~components/widgets/Button';
import ThemeText from '~components/widgets/ThemeText';

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

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={styles.petImageContainer}
        source={require('~assets/images/pet_demo.jpg')}
      />

      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} size={'large'} />
        ) : (
          <>
            <View
              style={[
                styles.petInfoCardRow,
                {marginBottom: StyleConstants.Spacing.S},
              ]}>
              <ThemeText style={{flex: 1}} fontStyle={'L'} numberOfLines={2}>
                {data?.petName}
              </ThemeText>
              <ThemeText color={'rgba(0, 0, 0, 0.6)'}>
                Lost at {moment(data?.createdAt).format('MMM DDD YYYY')}
              </ThemeText>
            </View>

            {data?.missingPlace != '' && (
              <MenuRow
                isDisable={true}
                icon={'md-location'}
                label={data?.missingPlace}
              />
            )}

            <MenuRow
              isDisable={true}
              icon={'md-location'}
              label={data?.gender ? 'Male' : 'Female'}
            />

            {data?.information != '' && (
              <View style={{marginBottom: StyleConstants.Spacing.M}}>
                <ThemeText
                  color={'rgba(0, 0, 0, 0.6)'}
                  fontStyle={'S'}
                  style={{marginBottom: StyleConstants.Spacing.S}}>
                  Information
                </ThemeText>
                <ThemeText>{data?.information}</ThemeText>
              </View>
            )}

            {data?.specialTraits != '' && data?.specialTraits != null && (
              <View style={{marginBottom: StyleConstants.Spacing.M}}>
                <ThemeText
                  color={'rgba(0, 0, 0, 0.6)'}
                  fontStyle={'S'}
                  style={{marginBottom: StyleConstants.Spacing.S}}>
                  Special Traits
                </ThemeText>
                <ThemeText>{data?.specialTraits}</ThemeText>
              </View>
            )}
          </>
        )}

        {/* Pet Owner Component */}
        {isOwnerExist && (
          <PetOwner
            {...{
              ownerName: data?._owner?.fullname,
              ownerProfile: data?._owner?.profileUrl,
            }}
          />
        )}
        {/* Pet Owner Component */}

        <Button
          title="View on Map"
          icon={'md-map'}
          onPress={() => navigation.navigate('Tab-Shared-Map', {isPin: false})}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  petImageContainer: {
    width: '100%',
    height: DEVICE.height / 2.3,
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
