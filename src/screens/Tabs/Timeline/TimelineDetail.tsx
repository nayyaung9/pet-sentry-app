import React from 'react';
import { Text, View } from 'react-native';
import ContainerLayout from '~components/ContainerLayout';
import Header from '~components/Header';

const TimelineDetail = () => {
  return (
    <ContainerLayout header={<Header title="Timeline Detail" />}>
      <Text>Timeline Detail</Text>
    </ContainerLayout>
  )
}

export default TimelineDetail;