import React from "react";
import {View, Text} from "react-native";
import {Header} from "../components";
import {colors} from  "../utils";
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

const DashboardScreen = ({navigation}) => {
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Home"
        navigation={navigation}
        onPress={() => {
          alert("More option here");
        }}
      ></Header>
      {/* <Tabs></Tabs> */}
    </View>
  );
};

export default DashboardScreen;
