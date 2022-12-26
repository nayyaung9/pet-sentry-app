import React from 'react';
import {View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';

interface ContainerLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  header,
  children,
}) => {
  return (
    <>
      {header}
      <View
        style={{
          flex: 1,
          padding: StyleConstants.Spacing.Global.PagePadding,
        }}>
        {children}
      </View>
    </>
  );
};

export default ContainerLayout;
