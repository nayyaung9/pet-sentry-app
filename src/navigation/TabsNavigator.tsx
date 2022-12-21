import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenTabsStackParamList} from '~utils/navigation/navigators';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabTimeline from '~screens/Tabs/Timeline';
import TabPost from '~screens/Tabs/Post';
import TabProfile from '~screens/Tabs/Profile';

const Tab = createBottomTabNavigator<ScreenTabsStackParamList>();

const ScreenTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Tab-Timeline'}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f00',
        tabBarInactiveTintColor: '#ddd',
        tabBarShowLabel: false,
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          switch (route.name) {
            case 'Tab-Timeline':
              return (
                <MaterialCommunityIcons
                  name={focused ? 'timeline' : 'timeline-outline'}
                  {...{size, color}}
                />
              );
            case 'Tab-Post':
              return (
                <MaterialCommunityIcons
                  name={focused ? 'shield-edit' : 'shield-edit-outline'}
                  {...{size, color}}
                />
              );
            case 'Tab-Profile':
              return (
                <MaterialCommunityIcons
                  name={focused ? 'account' : 'account-outline'}
                  {...{size, color}}
                />
              );
            default:
              return (
                <MaterialCommunityIcons
                  name={focused ? 'timeline' : 'timeline-outline'}
                  {...{size, color}}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="Tab-Timeline" component={TabTimeline} />
      <Tab.Screen name="Tab-Post" component={TabPost} />
      <Tab.Screen name="Tab-Profile" component={TabProfile} />
    </Tab.Navigator>
  );
};

export default ScreenTabs;
