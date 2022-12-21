import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenTabsStackParamList} from '~utils/navigation/navigators';
import TabTimeline from '~screens/Tabs/Timeline';
import TabPost from '~screens/Tabs/Post';
import TabProfile from '~screens/Tabs/Profile';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator<ScreenTabsStackParamList>();

const ScreenTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Tab-Timeline'}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f00',
        tabBarInactiveTintColor: '#ddd',
        // tabBarShowLabel: false,
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
                <Image
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/45455924?s=40&v=4',
                  }}
                  style={{width: 24, height: 24}}
                />
              );
            case 'Tab-Profile':
              return (
                <Image
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/45455924?s=40&v=4',
                  }}
                  style={{width: 24, height: 24}}
                />
              );
            case 'Tab-Post':
              return (
                <Image
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/45455924?s=40&v=4',
                  }}
                  style={{width: 24, height: 24}}
                />
              );
            default:
              return (
                <Image
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/45455924?s=40&v=4',
                  }}
                  style={{width: 24, height: 24}}
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
