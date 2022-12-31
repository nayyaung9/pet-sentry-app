import React from 'react';
import {StyleSheet, Pressable, PressableProps, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import InputLabel from './InputLabel';
import ThemeText from './ThemeText';

type InputProps = {
  label: string;
  helperText?: string;
} & PressableProps;

const Select = ({label, helperText, ...rest}: InputProps) => {
  const {colors} = useTheme();
  return (
    <View style={{paddingBottom: StyleConstants.Spacing.M}}>
      <InputLabel>{label}</InputLabel>

      <Pressable style={styles.inputContainer} {...rest} />
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
    padding: 0,
    ...StyleConstants.Font.Regular,
    height: 32,
    justifyContent: 'center',
  },
});
export default Select;
