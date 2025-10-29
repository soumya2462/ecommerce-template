/**
 * TabNavigator.tsx
 * Copyright (c) 2023 James Ugbanu.
 * Licensed under the MIT License.
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/HomeScreen";
import Shop from "../screens/ShopScreen";
import Category from "../screens/CategoryScreen";
import ProductFilter from "../screens/ProductFilterScreen";
import Profile from "../screens/ProfileScreen";
import VisualSearch from "../screens/VisualSearchScreen";
import SearchPhoto from "../screens/SearchPhotoScreen";
import CropPhoto from "../screens/CropPhotoScreen";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import LoginScreen from "../screens/LoginScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import BagScreen from "../screens/BagScreen";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeStack"
      component={Home}
      options={{
        headerTransparent: true,
        header: (props) => <Header {...props} isShowBackIcon={false} />,
      }}
    />
    <HomeStack.Screen
      name="VisualSearch"
      component={VisualSearch}
      options={{
        headerTransparent: true,
        header: (props) => <Header {...props} isShowBackIcon />,
      }}
    />
    <HomeStack.Screen
      name="SearchPhoto"
      component={SearchPhoto}
      options={{
        headerTransparent: true,
        header: (props) => <Header {...props} isShowBackIcon />,
      }}
    />
    <HomeStack.Screen
      name="CropPhoto"
      component={CropPhoto}
      options={{
        headerTransparent: true,
        header: (props) => <Header {...props} isShowBackIcon />,
      }}
    />
  </HomeStack.Navigator>
);

const ShopStack = createNativeStackNavigator();

const ShopStackScreen = () => (
  <ShopStack.Navigator>
    <ShopStack.Screen
      name="ShopStack"
      component={Shop}
      options={{
        headerTransparent: true,
        header: (props) => (
          <Header {...props} isShowBackIcon={false} isShowSearchIcon />
        ),
      }}
    />
    <ShopStack.Screen
      name="Category"
      component={Category}
      options={{
        headerTransparent: true,
        header: (props) => (
          <Header {...props} isShowBackIcon isShowSearchIcon />
        ),
      }}
    />
    <ShopStack.Screen
      name="ProductFilter"
      component={ProductFilter}
      options={{
        headerTransparent: true,
        header: (props) => <Header {...props} isShowBackIcon />,
      }}
    />
  </ShopStack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <TabBar
          navigation={props.navigation}
          state={props.state}
          descriptors={props.descriptors}
        />
      )}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Shop" component={ShopStackScreen} />
      <Tab.Screen name="Bag" component={BagScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
