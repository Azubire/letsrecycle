import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList } from "../AppDrawer/Types";
import { RecyclerStackParamList } from "../RecyclersStack/types";

export type HomeStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList> | undefined;
  Categories: undefined;
  RecyclersStack: NavigatorScreenParams<RecyclerStackParamList>;
  MyAds: { id: number };
  NotificationDetails: { id: number };
  AdDetails: { id: number; filter: string; userId: number };
  BecomeRecycler: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}
