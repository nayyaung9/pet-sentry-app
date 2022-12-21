import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';

type Props =
  | {
      style?: Omit<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight'>;
      fontStyle?: undefined;
      fontSize?: 'XS' | 'S' | 'M' | 'L';
      lineHeight?: 'S' | 'M' | 'L';
      fontWeight?: 'Regular' | 'Light' | 'Medium' | 'Bold';
      textTransform?: 'Lowercase' | 'Capitalize' | 'Uppercase';
    }
  | {
      style?: Omit<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight'>;
      fontStyle: 'S' | 'M' | 'L';
      fontSize?: undefined;
      lineHeight?: undefined;
      fontWeight?: 'Regular' | 'Light' | 'Medium' | 'Bold';
      textTransform?: 'Lowercase' | 'Capitalize' | 'Uppercase';
    };

const ThemeText: React.FC<Props & TextProps> = ({
  children,
  fontStyle,
  style,
  fontWeight = 'Regular',
}) => {
  return (
    <Text
      style={[
        style,
        {...(fontWeight && StyleConstants.Font[fontWeight])},
        {...(fontStyle && StyleConstants.FontStyle[fontStyle])},
      ]}
      children={children}
    />
  );
};

export default ThemeText;
