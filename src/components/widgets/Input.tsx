import React, {forwardRef, RefObject, MutableRefObject} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import InputLabel from './InputLabel';
import ThemeText from './ThemeText';

type inputProps = {
  value: [string, (value: string) => void];
  isFocused: MutableRefObject<boolean>;
  ref: RefObject<TextInput>;
  maxLength?: number;
};

export type InputState = {
  inputProps: inputProps[];
  targetIndex: number;
};

export type Props = {
  label: string;
  multiline?: boolean;
  helperText?: string;
} & Pick<NonNullable<InputState['inputProps'][0]>, 'value' | 'isFocused'> &
  Omit<
    TextInputProps,
    'style' | 'onChangeText' | 'keyboardAppearance' | 'multiline' | 'value'
  >;

const Input = forwardRef(
  (
    {
      label,
      multiline = false,
      helperText,
      value: [value, setValue],
      isFocused,
      ...rest
    }: Props,
    ref: any,
  ) => {
    const {colors} = useTheme();
    return (
      <View style={{paddingBottom: StyleConstants.Spacing.M}}>
        <InputLabel>{label}</InputLabel>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={setValue}
          style={[
            styles.inputContainer,
            {
              ...(isFocused.current
                ? {
                    borderBottomColor: colors.primary,
                  }
                : {
                    borderBottomColor: '#eee',
                  }),
            },
          ]}
          multiline={multiline}
          onKeyPress={() => isFocused.current = true}
          onFocus={() => (isFocused.current = true)}
          onSubmitEditing={() => (isFocused.current = false)}
          onEndEditing={() => (isFocused.current = false)}
          {...rest}
        />
        {helperText && (
          <ThemeText fontStyle={'XS'} color={colors.textSecondary}>
            {helperText}
          </ThemeText>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,

    paddingVertical: 0,
    ...StyleConstants.Font.Regular,
  },
});
export default Input;
