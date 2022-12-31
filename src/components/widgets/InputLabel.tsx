import React, {PropsWithChildren} from 'react';
import {StyleConstants} from '~utils/styles/constants';
import ThemeText from './ThemeText';

const InputLabel = ({children}: PropsWithChildren) => {
  return (
    <ThemeText
      style={{paddingBottom: StyleConstants.Spacing.S}}
      color={'rgba(0, 0, 0, 0.4)'}
      fontStyle={'XS'}
      fontWeight={'Regular'}>
      {children}
    </ThemeText>
  );
};

export default InputLabel;
