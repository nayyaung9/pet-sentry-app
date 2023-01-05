import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabSharedMap from '~screens/Tabs/Shared/Map';

const TabShared = ({
  Stack,
}: {
  Stack: ReturnType<typeof createNativeStackNavigator>;
}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        key="Tab-Shared-Map"
        name="Tab-Shared-Map"
        component={TabSharedMap}
      />
    </Stack.Group>
  );
};

export default TabShared;
