import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenTabsStackParamList} from '~utils/navigation/navigators';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TabTimeline from '~screens/Tabs/Timeline';
import TabPost from '~screens/Tabs/Post';
import TabProfile from '~screens/Tabs/Profile';

import {useTheme} from '~utils/styles/ThemeManager';
import {Image, StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator<ScreenTabsStackParamList>();

const profileUrl =
  'https://miro.medium.com/fit/c/40/40/1*9kIwT18smVjb-fhsOdUNBw.jpeg';
const isAuthenticated = true;

const ScreenTabs: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={'Tab-Timeline'}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#ddd',
        tabBarHideOnKeyboard: true,
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
                <>
                  {isAuthenticated ? (
                    <View
                      style={[
                        styles.authenticatedUserTabView,
                        {borderWidth: focused ? 2 : 0, borderColor: color},
                      ]}>
                      <Image
                        source={{uri: profileUrl}}
                        style={{width: 24, height: 24, borderRadius: 100}}
                      />
                    </View>
                  ) : (
                    <MaterialCommunityIcons
                      name={focused ? 'account' : 'account-outline'}
                      {...{size, color}}
                    />
                  )}
                </>
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

const styles = StyleSheet.create({
  authenticatedUserTabView: {
    borderRadius: 50,
    padding: 2,
  },
});

export default ScreenTabs;
