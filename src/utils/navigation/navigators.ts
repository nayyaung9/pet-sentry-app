import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Authentication: NavigatorScreenParams<AuthStackParamList>;
  'Screen-Tabs': NavigatorScreenParams<ScreenTabsStackParamList>;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackParamList = {
  'Root-Authenticate': undefined;
};

export type ScreenTabsStackParamList = {
  'Tab-Timeline': NavigatorScreenParams<TabTimelineParamList>;
  'Tab-Profile': NavigatorScreenParams<TabProfileParamList>;
  'Tab-Post': NavigatorScreenParams<TabPostParamList>;
};
export type ScreenTabsScreenProps<T extends keyof ScreenTabsStackParamList> =
  BottomTabScreenProps<ScreenTabsStackParamList, T>;

export type TabSharedStackParamList = {
  'Tab-Shared-Map': {
    isPin?: boolean;
    point?: {
      latitude: Number,
      longitude: Number,
    }
  };
};
export type TabSharedStackScreenProps<T extends keyof TabSharedStackParamList> =
  NativeStackScreenProps<TabSharedStackParamList, T>;

// Tabs
export type TabTimelineParamList = {
  'Tab-Timeline-Root': undefined;
  'Tab-Timeline-Detail': {
    petId: string;
    petName: string;
  };
} & TabSharedStackParamList;
export type TabTimelineStackScreenProps<T extends keyof TabTimelineParamList> =
  NativeStackScreenProps<TabTimelineParamList, T>;

export type TabPostParamList = {
  'Tab-Post-Root': undefined;
  'Tab-Post-Form': {
    actionType: string;
  };
} & TabSharedStackParamList;

export type TabProfileParamList = {
  'Tab-Profile-Root': undefined;
} & TabSharedStackParamList;
