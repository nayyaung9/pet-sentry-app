import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabProfileParamList } from '~utils/navigation/navigators'
import Root from './Root'

const Stack = createNativeStackNavigator<TabProfileParamList>()

const TabProfile: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Tab-Profile-Root' component={Root} />
    </Stack.Navigator>
  )
}

export default TabProfile;
