import React, {forwardRef} from 'react';
import { Dimensions } from "react-native";

import RBSheet from 'react-native-raw-bottom-sheet';
import { StyleConstants } from '~utils/styles/constants';

type ActionSheetProps = {
  children: React.ReactNode;
};

const DEVICE = Dimensions.get("window");

const ActionSheet = forwardRef<RBSheet, ActionSheetProps>((props, ref) => {
  const {children} = props;
  return (
    <RBSheet
      ref={ref}
      height={DEVICE.height / 2.5}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: StyleConstants.Spacing.M,
          paddingTop: StyleConstants.Spacing.S
        }
      }}>
      {children}
    </RBSheet>
  );
});

export default ActionSheet;
