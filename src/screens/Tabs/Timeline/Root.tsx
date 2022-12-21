import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar, TabBarProps, SceneRendererProps} from 'react-native-tab-view';
import Header from '~components/Header';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const TimelineRoot: React.FC = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Missing'},
    {key: 'second', title: 'Report'},
  ]);

  // const renderTabBar = (props: SceneRendererProps) => (
  //   <TabBar
  //     {...props}
  //     indicatorStyle={{backgroundColor: 'white'}}
  //     style={{backgroundColor: '#faa7ca'}}
  //   />
  // );

  return (
    <>
      <Header />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

export default TimelineRoot;
