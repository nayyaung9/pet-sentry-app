import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  'Screen-Tabs': NavigatorScreenParams<ScreenTabsStackParamList>;
};

export type ScreenTabsStackParamList = {
  'Tab-Timeline': NavigatorScreenParams<TabTimelineParamList>;
  'Tab-Profile': NavigatorScreenParams<TabProfileParamList>;
  'Tab-Post': NavigatorScreenParams<TabPostParamList>;
};

// Tabs
export type TabTimelineParamList = {
  'Tab-Timeline-Root': undefined;
  'Tab-Timeline-Detail': {
    petId: string;
    petName: string;
  };
  'Tab-Timeline-Map': undefined;
};
export type TabPostParamList = {
  'Tab-Post-Root': undefined;
  'Tab-Post-Form': {
    actionType: string;
  };
};
export type TabProfileParamList = {
  'Tab-Profile-Root': undefined;
};

export type TabTimelineStackScreenProps<T extends keyof TabTimelineParamList> =
  NativeStackScreenProps<TabTimelineParamList, T>;
