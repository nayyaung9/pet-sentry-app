import React from 'react';
import {View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';

interface ContainerLayoutProps {
  children: React.ReactNode;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
}) => {
  return (
    <>
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
