import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import TimelineCard from './TimelineCard';

const TimelineContainer = () => {
  const {colors} = useTheme();
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: colors.background}}
        contentContainerStyle={{
          padding: StyleConstants.Spacing.Global.PagePadding,
        }}
        data={Array(20).fill(data)}
        renderItem={({item, index}) => <TimelineCard {...{item, index}} />}
      />
    </>
  );
};

const data = {id: 1, name: 'Lu Soe Kg', createdAt: '2 mins ago.'};

export default TimelineContainer;
