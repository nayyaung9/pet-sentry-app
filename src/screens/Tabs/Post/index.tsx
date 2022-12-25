import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabPostParamList} from '~utils/navigation/navigators';
import Root from './Root';
import {useTheme} from '~utils/styles/ThemeManager';

const Stack = createNativeStackNavigator<TabPostParamList>();

const TabPost: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab-Post-Root"
        component={Root}
        options={({navigation}: any) => ({
          title: 'Submit or Report',
          headerShadowVisible: false,
          headerTitleStyle: {color: '#fff'},
          headerStyle: {
            backgroundColor: colors.primary,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default TabPost;
