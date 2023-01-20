import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import PinMyPet from '~components/PinMyPet';
import {useTimelineQuery} from '~utils/queryHooks/timeline';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import TimelineCard from './TimelineCard';
import {Flow} from 'react-native-animated-spinkit';

const TimelineContainer = ({queryKey}: {queryKey: string}) => {
  const {isLoading, data, error} = useTimelineQuery({
    activityType: queryKey === 'first' ? 'Missing' : 'Found',
  });

  const {colors} = useTheme();
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Flow size={48} color={colors.primary} />
        </View>
      ) : (
        data && (
          <FlatList
            ListHeaderComponent={<PinMyPet />}
            ListHeaderComponentStyle={styles.listHeaderView}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            style={{flex: 1, backgroundColor: colors.background}}
            data={data}
            renderItem={({item, index}) => <TimelineCard {...{item, index}} />}
          />
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listHeaderView: {
    backgroundColor: '#fff',
    marginBottom: StyleConstants.Spacing.M,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default TimelineContainer;
