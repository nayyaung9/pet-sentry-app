import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '~utils/navigation/navigators';
import ScreenTabs from './TabsNavigator';
import { useTheme } from '~utils/styles/ThemeManager';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  const { colors } = useTheme();
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen-Tabs">
          <Stack.Screen
            name="Screen-Tabs"
            component={ScreenTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default ApplicationNavigator;
