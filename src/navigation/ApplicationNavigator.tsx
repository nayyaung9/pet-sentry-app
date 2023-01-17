import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '~utils/navigation/navigators';
import ScreenTabs from './TabsNavigator';
import {useTheme} from '~utils/styles/ThemeManager';
import AuthenticationRoot from '~screens/Authentication/Root';
import {useAuthState} from '~utils/states/auth.state';
import {getCredential} from '~utils/storage/keychain';
import TimelineDetail from '~screens/Tabs/Timeline/TimelineDetail';
import PostForm from '~screens/Tabs/Post/PostForm';
import Map from "~screens/Map/Map";

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  const {colors} = useTheme();
  const token = useAuthState(state => state.token);
  const setCredential = useAuthState(state => state.setCredential);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const loginCredentialToken = await getCredential();
      if (loginCredentialToken) {
        setLoading(false);
        setCredential(loginCredentialToken);
      } else {
        setLoading(false);
        setCredential(null);
      }
    })();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <NavigationContainer>
        {loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={colors.primary} size={'large'} />
          </View>
        ) : (
          <Stack.Navigator>
            {token ? (
              <Stack.Screen
                name="Authentication"
                component={AuthenticationRoot}
                options={{headerShown: false}}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Screen-Tabs"
                  component={ScreenTabs}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Timeline-Detail"
                  component={TimelineDetail}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Timeline-Post-Form"
                  component={PostForm}
                  options={{headerShown: false}}
                />
                <Stack.Screen 
                  name="Map"
                  component={Map}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default ApplicationNavigator;
