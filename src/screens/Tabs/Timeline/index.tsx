import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabTimelineParamList } from '~utils/navigation/navigators'
import Root from './Root'
import TimelineDetail from './TimelineDetail'

const Stack = createNativeStackNavigator<TabTimelineParamList>()

const TabProfile: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Tab-Timeline-Root' component={Root} />
      <Stack.Screen name="Tab-Timeline-Detail" component={TimelineDetail} />
    </Stack.Navigator>
  )
}

export default TabProfile;
