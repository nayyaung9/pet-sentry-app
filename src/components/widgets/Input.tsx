import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import ThemeText from './ThemeText';

type InputProps = {
  label: string;
  helperText?: string;
} & TextInputProps;

const Input = ({label, helperText, ...rest}: InputProps) => {
  const {colors} = useTheme();
  return (
    <View style={{paddingBottom: StyleConstants.Spacing.M}}>
      <ThemeText
        style={{paddingBottom: StyleConstants.Spacing.S}}
        fontWeight={'Medium'}>
        {label}
      </ThemeText>
      <TextInput style={styles.inputContainer} {...rest} />
      {helperText && (
        <ThemeText fontStyle={'XS'} color={colors.textSecondary}>
          {helperText}
        </ThemeText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#f0f2f5',
    paddingLeft: StyleConstants.Spacing.M,
    ...StyleConstants.Font.Regular,
    borderRadius: 10,
  },
});
export default Input;
