import React from 'react';
import {useWindowDimensions, View, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TimelineContainer from '~components/Timeline/TimelineContainer';
import ThemeText from '~components/widgets/ThemeText';
import {useTheme} from '~utils/styles/ThemeManager';
import HeaderLeft from '~components/Header/Left';
import {useGeoState} from '~utils/states/geo.state';
import {TabTimelineParamList} from '~utils/navigation/navigators';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import HeaderRight from '~components/Header/Right';
import {StyleConstants} from '~utils/styles/constants';

const Route = ({route: {key}}: {route: any}) => {
  return <TimelineContainer queryKey={key} />;
};

const renderScene = SceneMap({
  first: Route,
  second: Route,
});

const TimelineRoot = () => {
  const geocoderLocation = useGeoState(state => state.location);
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();

  const layout = useWindowDimensions();
  const {colors} = useTheme();

  const [index, setIndex] = React.useState(0);
  
  const [routes] = React.useState([
    {key: 'first', title: 'Missing'},
    {key: 'second', title: 'Found'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: colors.primary}}
      renderLabel={({route, color}) => (
        <ThemeText style={{textTransform: 'uppercase'}} color={color}>
          {route.title}
        </ThemeText>
      )}
    />
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.primary,
          },
        ]}>
        <HeaderLeft
          content="md-menu"
          color={'#fff'}
          onPress={() => console.log('Will open Drawer Stack')}
        />
        <View>
          <ThemeText color={'#fff'} fontStyle={'M'} fontWeight={'Medium'}>
            Pet Sentry
          </ThemeText>
          {geocoderLocation != '' && (
            <ThemeText color={'#fff'} fontStyle={'XS'}>
              {geocoderLocation}
            </ThemeText>
          )}
        </View>
        <HeaderRight
          onPress={() => navigation.navigate('Tab-Timeline-Map')}
          content={'md-map'}
          color={'#fff'}
        />
      </View>
      <TabView
        lazy
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: StyleConstants.Spacing.M,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default TimelineRoot;
