import React from 'react';
import ThemeText from './widgets/ThemeText';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PinMyPet = () => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.pinBox} activeOpacity={0.7}>
      <ThemeText>You have reported your pet.</ThemeText>
      <View style={styles.pinBoxRow}>
        <ThemeText
          fontStyle={'XS'}
          color={colors.textSecondary}
          fontWeight={'Regular'}>
          View detail
        </ThemeText>
        <View style={styles.rowAlignCenter}>
          <View style={[styles.rowAlignCenter, {marginHorizontal: 4}]}>
            <MaterialCommunityIcons
              name={'eye-outline'}
              color={colors.textSecondary}
              size={14}
            />
            <ThemeText
              style={{marginLeft: StyleConstants.Spacing.S - 4}}
              fontStyle={'XS'}>
              10
            </ThemeText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pinBox: {
    backgroundColor: '#fff',
    paddingHorizontal: StyleConstants.Spacing.M,
    paddingVertical: StyleConstants.Spacing.S,
  },
  pinBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAlignCenter: {flexDirection: 'row', alignItems: 'center'},
});
export default PinMyPet;
