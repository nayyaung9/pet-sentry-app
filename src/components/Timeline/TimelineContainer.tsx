import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import PinMyPet from '~components/PinMyPet';
import {useTimelineQuery} from '~utils/queryHooks/timeline';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import TimelineCard from './TimelineCard';

const TimelineContainer = ({queryKey}: {queryKey: string}) => {
  const {isLoading, data, error} = useTimelineQuery({
    activityType: queryKey === 'first' ? 'Missing' : 'Found',
  });

  const {colors} = useTheme();
  return (
    <>
      {!isLoading && data && (
        <FlatList
          ListHeaderComponent={<PinMyPet />}
          ListHeaderComponentStyle={styles.listHeaderView}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          style={{flex: 1, backgroundColor: colors.background}}
          data={data}
          renderItem={({item, index}) => <TimelineCard {...{item, index}} />}
        />
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
});
export default TimelineContainer;
