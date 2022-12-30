import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabPostParamList} from '~utils/navigation/navigators';
import Root from './Root';
import {useTheme} from '~utils/styles/ThemeManager';
import PostForm from './PostForm';
import HeaderLeft from '~components/Header/Left';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import {capitalizeFirstLetter} from '~utils/helpers/capitalizeFirstLetter';

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
          headerTitleStyle: {color: '#fff', ...StyleConstants.Font.Regular},
          headerStyle: {
            backgroundColor: colors.primary,
          },
        })}
      />
      <Stack.Screen
        name="Tab-Post-Form"
        component={PostForm}
        options={({navigation, route: {params}}: any) => ({
          headerShadowVisible: false,
          headerStyle: {backgroundColor: colors.primary},
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderLeft
              content={'md-arrow-back'}
              onPress={() => navigation.goBack()}
              color={colors.textWhite}
            />
          ),
          headerTitle: () => (
            <ThemeText color={colors.textWhite}>{`${capitalizeFirstLetter(
              params?.actionType,
            )} Pet`}</ThemeText>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default TabPost;
