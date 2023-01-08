import React from 'react';
import {View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import Avatar from './Avatar';
import ThemeText from './widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '~utils/styles/ThemeManager';

interface PetOwnerProps {
  ownerProfile: string;
  ownerName: string;
}

const PetOwner = ({ownerProfile, ownerName}: PetOwnerProps) => {
  const {colors} = useTheme();
  return (
    <View style={{ paddingTop: StyleConstants.Spacing.S, paddingBottom: StyleConstants.Spacing.M }}>
      <ThemeText color={colors.textSecondary} fontStyle={'XS'}>Owner Info</ThemeText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: StyleConstants.Spacing.S,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar src={ownerProfile} />
          <ThemeText
            style={{marginLeft: StyleConstants.Spacing.S}}
            fontWeight={'Medium'}>
            {ownerName}
          </ThemeText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
            name="md-chatbubbles-outline"
            size={24}
            color={colors.primary}
            style={{marginRight: 16}}
          />
          <Ionicons name="md-call-outline" size={24} color={colors.primary} />
        </View>
      </View>
    </View>
  );
};

export default PetOwner;
