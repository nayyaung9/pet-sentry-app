import React from 'react';
import {StyleProp, StyleSheet, View, TextStyle, ViewStyle} from 'react-native';
import {useTheme} from '~utils/styles/ThemeManager';
import ThemeText from './ThemeText';

interface IconLabelProps {
  label: string | number;
  iconComponent: any;
  iconName: string;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle
}

const IconLabel: React.FC<IconLabelProps> = ({
  label,
  iconComponent,
  iconName,
  iconColor,
  containerStyle,
  labelStyle
}) => {
  let IconComponent = iconComponent;
  const {colors} = useTheme();
  return (
    <View style={[styles.iconLabelRow, containerStyle]}>
      <IconComponent
        name={iconName}
        size={16}
        color={iconColor || colors.primary}
      />
      <ThemeText
        fontStyle={'S'}
        color={'rgba(0, 0, 0, 0.7)'}
        style={labelStyle}
        numberOfLines={2}>
        {label}
      </ThemeText>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLabelRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default IconLabel;
