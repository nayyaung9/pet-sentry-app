import React, {useMemo} from 'react';
import {Pressable, View, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import ThemeText from './ThemeText';

interface ButtonProps {
  icon?: string;
  title?: string;
  disabled?: boolean;

  onPress: () => void;
}
const Button = ({icon, title, disabled, onPress}: ButtonProps) => {
  const {theme, colors} = useTheme();

  const mainColor = useMemo(() => {
    if (disabled) {
      return colors.textDisable;
    } else {
      return colors.textWhite;
    }
  }, [theme, disabled]);

  const children = useMemo(() => {
    if (icon && !title) {
      return <Ionicons name={icon} size={24} color={mainColor} />;
    }
    if (title && !icon) {
      return <ThemeText color={mainColor}>{title}</ThemeText>;
    }
    if (title && icon) {
      return (
        <>
          <Ionicons name={icon} size={24} color={mainColor} />
          <View style={{marginHorizontal: 4}} />
          <ThemeText color={mainColor}>{title}</ThemeText>
        </>
      );
    }
  }, [theme, disabled]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      children={children}
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: disabled ? colors.buttonDisable : colors.primary,
        minHeight: 44,
        marginVertical: StyleConstants.Spacing.M,
        borderRadius: 10,
      }}
    />
  );
};

export default Button;
