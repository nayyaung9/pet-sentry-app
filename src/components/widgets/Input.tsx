import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import InputLabel from './InputLabel';
import ThemeText from './ThemeText';

type InputProps = {
  label: string;
  helperText?: string;
} & TextInputProps;

const Input = ({label, helperText, ...rest}: InputProps) => {
  const {colors} = useTheme();
  return (
    <View style={{paddingBottom: StyleConstants.Spacing.M}}>
      <InputLabel>{label}</InputLabel>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 0,
    ...StyleConstants.Font.Regular,
  },
});
export default Input;
