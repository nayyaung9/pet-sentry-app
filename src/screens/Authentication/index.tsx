import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from '~utils/navigation/navigators';
import {useTheme} from '~utils/styles/ThemeManager';
import {StyleConstants} from '~utils/styles/constants';

// Screens Stacks
import Root from './Root';

const Auth = createNativeStackNavigator<AuthStackParamList>();

const Authentication: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Auth.Navigator>
      <Auth.Screen name="Root-Authenticate" component={Root} />
    </Auth.Navigator>
  );
};

export default Authentication;
