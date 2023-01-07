import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabSharedMap from './Map';

const TabShared = ({
  Stack,
}: {
  Stack: ReturnType<typeof createNativeStackNavigator>;
}) => {
  return (
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen
        key="Tab-Shared-Map"
        name="Tab-Shared-Map"
        component={TabSharedMap}
      />
    </Stack.Group>
  );
};

export default TabShared;
