import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/HomeScreen";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { TabParamList, TabScreenProps } from "./types";
import Explore from "../../screens/Explore";
import Sell from "../../screens/Sell";
import Search from "../../screens/Search";
import Profile from "../../screens/ProfileScreen";
import { Avatar, Badge, Divider, Menu, useTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { getUser, removeUser } from "../../store/features/AuthSlice";
import * as secureStore from "expo-secure-store";
import { baseUrl } from "../../utils/helpers";

const Tab = createBottomTabNavigator<TabParamList>();

const AppTabs = () => {
  const { colors } = useTheme();

  const [visible, setVisible] = React.useState(false);
  const state = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const handleLogOut = async () => {
    try {
      await secureStore.deleteItemAsync("USERTOKEN");

      dispatch(removeUser());
      // console.log("user token deleted");
    } catch (error) {
      // console.log("error deleteing user token");
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => {
        return {
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.light,
          tabBarStyle: { height: 60 },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarHideOnKeyboard: true,
        };
      }}
    >
      <Tab.Screen
        name="Home"
        options={({ navigation, route }: TabScreenProps<"Home">) => ({
          tabBarIcon({ focused, color, size }) {
            return (
              <AntDesign
                name={focused ? "home" : "home"}
                size={30}
                color={color}
              />
            );
          },
          // headerShown: true,
          headerLeft: (props) => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <MaterialCommunityIcons name="menu" size={30} color="#fff" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 15 },
          headerRightContainerStyle: { paddingRight: 15 },
          headerStatusBarHeight: 24,

          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 70,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Notifications");
                  }}
                >
                  <MaterialCommunityIcons
                    name="bell-badge-outline"
                    size={25}
                    color="#fff"
                  />
                  {route.params?.notificationCount ? (
                    <Badge size={13} style={{ position: "absolute" }}>
                      {route.params?.notificationCount
                        ? route.params.notificationCount
                        : 0}
                    </Badge>
                  ) : (
                    <Badge size={13} style={{ position: "absolute" }}>
                      0
                    </Badge>
                  )}
                </TouchableOpacity>

                <Menu
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                  anchor={
                    <TouchableOpacity onPress={() => setVisible(true)}>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={25}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      navigation.navigate("MyAds", {
                        id: state.user.profile.id,
                      });
                      setVisible(false);
                    }}
                    title="My Ads"
                  />
                  <Menu.Item
                    onPress={() => {
                      navigation.navigate("History");
                      setVisible(false);
                    }}
                    title="History"
                  />
                  <Divider />
                  <Menu.Item onPress={handleLogOut} title="Logout" />
                </Menu>
              </View>
            );
          },
        })}
        component={Home}
      />
      <Tab.Screen
        name="Explore"
        options={{
          tabBarIcon({ focused, color, size }) {
            return (
              <MaterialCommunityIcons
                name={focused ? "compass-rose" : "compass-rose"}
                size={30}
                color={color}
              />
            );
          },
          // tabBarStyle: { display: "none" },
          headerStyle: { backgroundColor: colors.info },
        }}
        component={Explore}
      />
      <Tab.Screen
        name="Sell"
        options={{
          tabBarIcon({ focused, color, size }) {
            return (
              <AntDesign
                name={focused ? "pluscircle" : "pluscircle"}
                size={45}
                color={focused ? colors.primary : colors.secondary}
              />
            );
          },
          // tabBarStyle: { display: "none" },
          headerTitle: "Create an ad",
        }}
        component={Sell}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon({ focused, color, size }) {
            return (
              <AntDesign
                name={focused ? "search1" : "search1"}
                size={30}
                color={color}
              />
            );
          },
          // tabBarStyle: { display: "none" },
        }}
        component={Search}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon({ focused, color, size }) {
            return state.user.profile.profileImg ? (
              <Avatar.Image
                size={30}
                source={{
                  uri: `${baseUrl}/images/categoryImages/${state.user.profile?.profileImg}`,
                }}
              />
            ) : (
              <Avatar.Image size={30} source={state.defaultImg.profileImg} />
            );
          },
          // tabBarStyle: { display: "none" },
          headerShown: false,
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
