import React, {forwardRef} from 'react';
import {Dimensions} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleConstants} from '~utils/styles/constants';

type ActionSheetProps = {
  children: React.ReactNode;
  dataCount: any[];
};

const DEVICE = Dimensions.get('window');

const DEFAULT_SHEET_HEIGHT = DEVICE.height / 2.5;
const MIN_SHEET_HEIGHT = DEVICE.height / 6;

const ActionSheet = forwardRef<RBSheet, ActionSheetProps>((props, ref) => {
  const {children, dataCount} = props;
  return (
    <RBSheet
      ref={ref}
      height={
        Array.isArray(dataCount)
          ? dataCount?.length >= 8
            ? DEFAULT_SHEET_HEIGHT
            : MIN_SHEET_HEIGHT
          : DEFAULT_SHEET_HEIGHT
      }
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: StyleConstants.Spacing.M,
          paddingTop: StyleConstants.Spacing.S,
        },
      }}>
      {children}
    </RBSheet>
  );
});

export default ActionSheet;
