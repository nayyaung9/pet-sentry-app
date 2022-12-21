import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabTimelineParamList } from '~utils/navigation/navigators'
import Root from './Root'

const Stack = createNativeStackNavigator<TabTimelineParamList>()

const TabProfile: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name='Tab-Timeline-Root' component={Root} />
    </Stack.Navigator>
  )
}

export default TabProfile;
