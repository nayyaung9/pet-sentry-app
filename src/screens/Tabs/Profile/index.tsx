import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabProfileParamList} from '~utils/navigation/navigators';
import Root from './Root';
import {useTheme} from '~utils/styles/ThemeManager';

const Stack = createNativeStackNavigator<TabProfileParamList>();

const TabProfile: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab-Profile-Root"
        component={Root}
        options={({navigation}: any) => ({
          title: 'Profile',
          headerShadowVisible: false,
          headerTitleStyle: {color: '#fff'},
          headerStyle: {
            backgroundColor: colors.primary,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default TabProfile;
