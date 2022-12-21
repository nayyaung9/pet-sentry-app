import React from 'react';
import ContainerLayout from '~components/ContainerLayout';
import Header from '~components/Header';
import ThemeText from '~components/widgets/ThemeText';

const Timeline: React.FC = () => {
  return (
    <ContainerLayout header={<Header />}>
      <ThemeText fontWeight={'Medium'} fontStyle={'M'}>Timeline Stack Screen</ThemeText>
    </ContainerLayout>
  )
}

export default Timeline;