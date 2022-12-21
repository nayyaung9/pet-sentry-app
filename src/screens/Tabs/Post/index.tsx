import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabPostParamList } from '~utils/navigation/navigators'
import Root from './Root'

const Stack = createNativeStackNavigator<TabPostParamList>()

const TabPost: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name='Tab-Post-Root' component={Root} />
    </Stack.Navigator>
  )
}

export default TabPost;
