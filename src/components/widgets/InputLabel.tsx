import React from 'react';
import {StyleConstants} from '~utils/styles/constants';
import ThemeText from './ThemeText';

interface InputLabelProps {
  children: React.ReactNode;
  noPadding?: boolean;
}
const InputLabel = ({children, noPadding = false}: InputLabelProps) => {
  return (
    <ThemeText
      style={{paddingBottom: noPadding ? 0 : StyleConstants.Spacing.S}}
      color={'rgba(0, 0, 0, 0.4)'}
      fontStyle={'XS'}
      fontWeight={'Regular'}>
      {children}
    </ThemeText>
  );
};

export default InputLabel;
