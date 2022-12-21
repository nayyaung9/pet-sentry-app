import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '~utils/navigation/navigators';
import ScreenTabs from './TabsNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
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
