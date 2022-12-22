import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Header from '~components/Header';
import { useTheme } from '~utils/styles/ThemeManager';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#F9FCFF'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const TimelineRoot: React.FC = () => {
  const layout = useWindowDimensions();
  const { colors } = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Missing'},
    {key: 'second', title: 'Report'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: colors.primary}}
    />
  );

  return (
    <>
      <Header />
      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

export default TimelineRoot;
