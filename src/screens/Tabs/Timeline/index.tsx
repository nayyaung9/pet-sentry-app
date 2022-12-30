import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabTimelineParamList} from '~utils/navigation/navigators';
import Root from './Root';
import TimelineDetail from './TimelineDetail';
import HeaderLeft from '~components/Header/Left';
import {useTheme} from '~utils/styles/ThemeManager';
import Map from './Map';
import ThemeText from '~components/widgets/ThemeText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable, View} from 'react-native';
import {useGeoState} from '~utils/states/geo.state';

const Stack = createNativeStackNavigator<TabTimelineParamList>();

const TabProfile: React.FC = () => {
  const {colors} = useTheme();
  const geocoderLocation = useGeoState(state => state.location);
  console.log("geocoderLocation", geocoderLocation)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab-Timeline-Root"
        component={Root}
        options={({navigation}: any) => ({
          title: 'Pet Sentry',
          headerShadowVisible: false,
          headerLeft: () => (
            <Ionicons name="md-menu" size={24} color={'#fff'} />
          ),
          headerTitle: () => (
            <View style={{alignItems: 'center'}}>
              <ThemeText color={'#fff'} fontStyle={'M'} fontWeight={'Medium'}>
                Pet Sentry
              </ThemeText>
              {geocoderLocation != '' && (
                <ThemeText color={'#fff'} fontStyle={'XS'}>
                  {geocoderLocation}
                </ThemeText>
              )}
            </View>
          ),
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Tab-Timeline-Map')}
              children={<Ionicons name="md-map" size={24} color={'#fff'} />}
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
