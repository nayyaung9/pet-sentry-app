import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Authentication: NavigatorScreenParams<AuthStackParamList>;
  'Screen-Tabs': NavigatorScreenParams<ScreenTabsStackParamList>;
  'Timeline-Detail': {
    petId: string | undefined;
  };
  'Timeline-Post-Form': {
    actionType: string;
  };
  "Map": {
    isPin?: boolean;
    point?: {
      latitude: Number | null;
      longitude: Number | null;
    };
  };
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackParamList = {
  'Root-Authenticate': undefined;
};

export type ScreenTabsStackParamList = {
  'Tab-Timeline': undefined;
  'Tab-Profile': undefined;
  'Tab-Post': undefined;
};
export type ScreenTabsScreenProps<T extends keyof ScreenTabsStackParamList> =
  BottomTabScreenProps<ScreenTabsStackParamList, T>;
