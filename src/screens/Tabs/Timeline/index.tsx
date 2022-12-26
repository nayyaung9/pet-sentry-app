import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabTimelineParamList} from '~utils/navigation/navigators';
import Root from './Root';
import TimelineDetail from './TimelineDetail';
import HeaderLeft from '~components/Header/Left';
import {useTheme} from '~utils/styles/ThemeManager';
import HeaderRight from '~components/Header/Right';
import Map from './Map';
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
        options={({navigation}: any) => ({
          title: 'Pet Sentry',
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderRight
              content="md-map"
              onPress={() => navigation.navigate('Tab-Timeline-Map')}
            />
          ),
          headerTitleStyle: {color: '#fff'},
          headerStyle: {
            backgroundColor: colors.primary,
          },
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
            <ThemeText color={colors.textWhite}>{params?.pet?.name}</ThemeText>
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
      <Stack.Screen
        name="Tab-Timeline-Map"
        component={Map}
        options={({navigation}: any) => ({
          title: 'Map',
          headerLeft: () => <HeaderLeft onPress={() => navigation.pop(1)} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default TabProfile;
