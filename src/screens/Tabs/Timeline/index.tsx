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
          title: params?.pet?.name,
          headerLeft: () => <HeaderLeft onPress={() => navigation.pop(1)} />,
        })}
      />
      <Stack.Screen
        name="Tab-Timeline-Map"
        component={Map}
        options={({navigation, route: {params}}: any) => ({
          title: "Map",
          headerLeft: () => <HeaderLeft onPress={() => navigation.pop(1)} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default TabProfile;
