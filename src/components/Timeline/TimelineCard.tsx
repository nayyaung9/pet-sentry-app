import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {TabTimelineParamList} from '~utils/navigation/navigators';
import {StackNavigationProp} from '@react-navigation/stack';

const TimelineCard = ({item}: {item: any}) => {
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Tab-Timeline-Detail')}
      style={{
        marginBottom: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f0f2f5',
      }}>
      <FastImage
        style={{
          width: '100%',
          height: 200,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={{
          uri: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{padding: 8}}>
        <ThemeText fontStyle="M">{item?.name}</ThemeText>
        <ThemeText fontStyle={'S'}>{item?.createdAt}</ThemeText>
      </View>
    </TouchableOpacity>
  );
};

export default TimelineCard;
