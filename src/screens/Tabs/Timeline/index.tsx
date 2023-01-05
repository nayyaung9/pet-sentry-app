import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabTimelineParamList} from '~utils/navigation/navigators';
import Root from './Root';
import TabShared from '../Shared';
import TimelineDetail from './TimelineDetail';
import HeaderLeft from '~components/Header/Left';
import {useTheme} from '~utils/styles/ThemeManager';
import ThemeText from '~components/widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

const Stack = createNativeStackNavigator<TabTimelineParamList>();

const TabProfile: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab-Timeline-Root"
        component={Root}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Tab-Timeline-Detail"
        component={TimelineDetail}
        options={({navigation, route: {params}}: any) => ({
          headerShadowVisible: false,
          headerStyle: {backgroundColor: colors.primary},
          headerBackVisible: false,
          headerLeft: () => (
            <HeaderLeft
              content={'md-arrow-back'}
              onPress={() => navigation.goBack()}
              color={colors.textWhite}
            />
          ),
          headerTitle: () => (
            <ThemeText color={colors.textWhite}>{params?.petName}</ThemeText>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="heart-outline"
                size={24}
                color={'#fff'}
                style={{marginRight: 16}}
              />
              <Ionicons
                name="md-share-social-outline"
                size={24}
                color={'#fff'}
              />
            </View>
          ),
        })}
      />

      {TabShared({ Stack })}
    </Stack.Navigator>
  );
};

export default TabProfile;
