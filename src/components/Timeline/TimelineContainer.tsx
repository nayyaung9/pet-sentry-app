import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import PinMyPet from '~components/PinMyPet';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import TimelineCard from './TimelineCard';

const TimelineContainer = () => {
  const {colors} = useTheme();
  return (
    <>
      <FlatList
        ListHeaderComponent={<PinMyPet />}
        ListHeaderComponentStyle={styles.listHeaderView}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: colors.background}}
        data={data}
        renderItem={({item, index}) => <TimelineCard {...{item, index}} />}
      />
    </>
  );
};

const data = [
  {id: 1, name: 'Lu Soe Kg', createdAt: '2 mins ago.'},
  {id: 2, name: 'Luna', createdAt: '1 week ago'},
  {id: 3, name: 'Lu Soe Kg', createdAt: '2 mins ago.'},
  {id: 4, name: 'Luna', createdAt: '1 week ago'},
  {id: 5, name: 'Lu Soe Kg', createdAt: '2 mins ago.'},
  {id: 6, name: 'Luna', createdAt: '1 week ago'},
];

const styles = StyleSheet.create({
  listHeaderView: { 
    backgroundColor: '#fff',
    marginBottom: StyleConstants.Spacing.M,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5'
  },
});
export default TimelineContainer;
