import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import NationalGraph from '../screens/NationalGraph';
import ProvinceStats from '../screens/ProvinceStats';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'NationalGraph';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="NationalGraph"
        component={NationalGraph}
        options={{
          title: 'National Graph',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="ProvinceStats"
        component={ProvinceStats}
        options={{
          title: 'Province Stats',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'NationalGraph':
      return 'National statistics about COVID-19';
    case 'ProvinceStats':
      return 'Province statistics about COVID-19';
  }
}
