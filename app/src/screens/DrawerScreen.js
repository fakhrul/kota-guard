import React, { useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Button
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  Fontisto,
  FontAwesome5,
  Octicons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { NavigationActions } from "react-navigation";
import { colors } from "../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { SidebarLink, SidebarTitle } from "../components";
import { Context as AuthContext } from "../context/AuthContext";
import { DrawerHeaderPlaceholder, DrawerHeader } from "../components";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../graphql/query";
import { PollIntervals } from "../constants";

const DrawerScreen = ({ navigation }) => {
  const { state,signout } = useContext(AuthContext);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { id: state.userId },
    pollInterval: PollIntervals.profile,
    fetchPolicy: "network-only",
  });

  const onHeaderPress = () => {
    navigation.navigate("profileFlow");
  };
  let drawerHeader = <DrawerHeaderPlaceholder />;

  if (!loading && !error) {
    const {
      getUser: { avatar, name, handle, following, followers },
    } = data;

    drawerHeader = (
      <>
        <View>
          <DrawerHeader
            onPress={onHeaderPress}
            avatar={avatar}
            name={name}
            handle={handle}
            following={following.length}
            followers={followers.length}
          ></DrawerHeader>
        </View>
      </>
    );
  }

  const navigateToScreen = (route) => () => {
    navigation.navigate(route);
  };

  return (
    <ScrollView>
      <View
        style={{
          width: undefined,
          height: 150,
          padding: 16,
          paddingTop: 48,
          backgroundColor: colors.background,
          // flexDirection: "row",
        }}
      >
        {drawerHeader}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <SidebarTitle title="MAIN"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Home"
            route="homeFlow"
            icon={<Entypo name="home" size={20} color={colors.text.title} />}
          ></SidebarLink>

         <Button title="Force Logout" onPress={signout}></Button>

          <Divider />
          <SidebarTitle title="DISCOVER"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Community Search"
            route="communityFlow"
            icon={
              <FontAwesome5 name="search" size={18} color={colors.text.title} />
            }
          ></SidebarLink>
          <Divider />
          <SidebarTitle title="SECURITY GUARD"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Visitor"
            route="visitorFlow"
            icon={
              <FontAwesome name="car" size={18}
                color={colors.text.title} />

            }
          ></SidebarLink>
          <Divider />
          <SidebarTitle title="COMMUNITY ADMIN"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Resident Registration"
            route="ResidentRegistrationScreen"
            icon={
              <Ionicons
                name="md-person-add"
                size={20}
                color={colors.text.title}
              />
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Service"
            route="serviceFlow"
            icon={
              <MaterialIcons
                name="monetization-on"
                size={20}
                color={colors.text.title}
              ></MaterialIcons>
            }
          ></SidebarLink>
          <Divider />
          <SidebarTitle title="SYSTEM ADMIN"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Community Registration"
            route="CommunityRegistrationScreen"
            icon={
              <FontAwesome
                name="address-book"
                size={20}
                color={colors.text.title}
              />
            }
          ></SidebarLink>
          <Divider />

          <SidebarTitle title="ABOUT APP"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Info"
            route="AppInfoScreen"
            icon={
              <MaterialIcons name="info"
                size={22}
                color={colors.text.title} />
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Feedback"
            route="FeedbackScreen"
            icon={
              <MaterialIcons
                name="email"
                size={20}
                color={colors.text.title}
              ></MaterialIcons>
            }
          ></SidebarLink>
         
          {/* <SidebarLink
            navigation={navigation}
            title="Disclaimer"
            route="homeFlow"
            icon={
              <FontAwesome5
                name="handshake"
                size={20}
                color={colors.text.title}
              ></FontAwesome5>
            }
          ></SidebarLink> */}
          <Divider></Divider>
          {/* <SidebarTitle title="MORE"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Setting"
            route="homeFlow"
            icon={
              <MaterialCommunityIcons
                name="settings"
                size={20}
                color={colors.text.title}
              ></MaterialCommunityIcons>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Logout"
            route="SignoutScreen"
            icon={
              <Ionicons
                name="ios-exit"
                size={20}
                color={colors.text.title}
              ></Ionicons>
            }
          ></SidebarLink> */}
        </View>
        {/* <DrawerNavigatorItems {...props}></DrawerNavigatorItems> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  navItemStyle: {
    padding: 10,
  },
  navSectionStyle: {
    backgroundColor: "lightgrey",
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: "lightgrey",
  },
});

export default DrawerScreen;
