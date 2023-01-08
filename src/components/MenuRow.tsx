import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import ThemeText from './widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MenuRowProps {
  isDisable?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
}
const MenuRow = ({isDisable = false, icon, label, value}: MenuRowProps) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled
      style={{
        marginVertical: StyleConstants.Spacing.S,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {icon}
      <View style={{paddingLeft: StyleConstants.Spacing.M}}>
        <ThemeText
          color={colors.textSecondary}
          fontStyle={'XS'}
          style={{flex: 1}}>
          {label}
        </ThemeText>
        <ThemeText color={'#000'} style={{flex: 1}}>
          {value}
        </ThemeText>
      </View>
    </TouchableOpacity>
  );
};

export default MenuRow;
