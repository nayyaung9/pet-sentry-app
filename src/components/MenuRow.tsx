import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import ThemeText from './widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MenuRowProps {
  isDisable?: boolean;
  icon: string;
  label: string;
}
const MenuRow = ({isDisable = false, icon, label}: MenuRowProps) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled
      style={{
        marginBottom: StyleConstants.Spacing.M,
        flexDirection: 'row',
      }}>
      <Ionicons name={icon} size={20} color={'rgba(0, 0, 0, 0.6)'} />
      <ThemeText
        color={colors.textSecondary}
        style={{flex: 1, paddingLeft: StyleConstants.Spacing.S}}>
        {label}
      </ThemeText>
    </TouchableOpacity>
  );
};

export default MenuRow;
