import {NavigatorScreenParams} from '@react-navigation/native';

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
    pet: {id: number; name: string; createdAt: string};
  };
};
export type TabPostParamList = {
  'Tab-Post-Root': undefined;
};
export type TabProfileParamList = {
  'Tab-Profile-Root': undefined;
};
