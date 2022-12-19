import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/navigation/navigators';

const Stack = createNativeStackNavigator<RootStackParamList>();

import Home from '~screens/Home'

const ApplicationNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default ApplicationNavigator;
