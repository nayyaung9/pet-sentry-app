import React from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TimelineContainer from '~components/Timeline/TimelineContainer';
import ThemeText from '~components/widgets/ThemeText';
import {useTheme} from '~utils/styles/ThemeManager';

const Route = ({route: {key}}: {route: any}) => {
  return <TimelineContainer key={key} />;
};
const renderScene = SceneMap({
  first: Route,
  second: Route,
});

const TimelineRoot: React.FC = () => {
  const layout = useWindowDimensions();
  const {colors} = useTheme();

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
      renderLabel={({route, color}) => (
        <ThemeText style={{color, textTransform: 'uppercase'}}>
          {route.title}
        </ThemeText>
      )}
    />
  );

  return (
    <TabView
      lazy
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default TimelineRoot;
