import React from "react";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import StreamScreen from "./src/screens/StreamScreen";
import SettingScreen from "./src/screens/SettingScreen";
import PortfolioNoteScreen from "./src/screens/PortfolioNoteScreen";
import AboutScreen from "./src/screens/AboutScreen";
import MyProfileScreen from "./src/screens/MyProfileScreen";
import ChatScreen from "./src/screens/ChatScreen";
import DrawerScreen from "./src/screens/DrawerScreen";
import LoginWithEmailScreen from "./src/screens/LoginWithEmailScreen";
import AddPostScreen from "./src/screens/AddPostScreen";

import { createDrawerNavigator } from "react-navigation-drawer";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import ConversationScreen from "./src/screens/ConversationScreen";
import PostFeedScreen from "./src/screens/PostFeedScreen";
import { colors } from "./src/utils";

import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Feather,
  Foundation,
  Ionicons,
} from "@expo/vector-icons";

import {
  createAppContainer,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import PostViewScreen from "./src/screens/PostViewScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";
import ProfileViewScreen from "./src/screens/ProfileViewScreen";
import MessageScreen from "./src/screens/MessageScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import CommunityScreen from "./src/screens/CommunityScreen";
import CommunityAddScreen from "./src/screens/CommunityAddScreen";
import CommunityViewScreen from "./src/screens/CommunityViewScreen";
import ServiceScreen from "./src/screens/ServiceScreen";
import ServiceAddScreen from "./src/screens/ServiceAddScreen";
import ServiceDetailScreen from "./src/screens/ServiceDetailScreen";
import VisitorScreen from "./src/screens/VisitorScreen";
import VisitorViewScreen from "./src/screens/VisitorViewScreen";
import AppInfoScreen from "./src/screens/AppInfoScreen";
import FeedbackScreen from "./src/screens/FeedbackScreen";
import ResidentRegistrationScreen from "./src/screens/ResidentRegistrationScreen";
import CommunityRegistrationScreen from "./src/screens/CommunityRegistrationScreen";
import MyBillingScreen from "./src/screens/MyBillingScreen";
import BillingAddScreen from "./src/screens/BillingAddScreen";
import VisitorAddScreen from "./src/screens/VisitorAddScreen";

const dashboardFlow = createStackNavigator({
  Dashboard: DashboardScreen,
});

dashboardFlow.navigationOptions = {
  title: "Home",
  tabBarIcon: (
    <Foundation
      name="graph-pie"
      size={20}
      color={colors.text.title}
    ></Foundation>
  ),
};

// const stockFlow = createStackNavigator({
//   Stock: StockScreen,
// });

const conversationFlow = createStackNavigator({
  Conversation: ConversationScreen,
});

const messageFlow = createStackNavigator({
  Message: MessageScreen,
  conversationFlow,
});

const myBillingFlow = createStackNavigator({
  MyBilling: MyBillingScreen,
});

const exploreFlow = createStackNavigator({
  ExploreScreen,
  PostView: PostViewScreen,
});
const serviceFlow = createStackNavigator({
  ServiceScreen,
  ServiceAdd: ServiceAddScreen,
  ServiceDetail: ServiceDetailScreen,
  BillingAdd: BillingAddScreen,
});

const profileViewFlow = createStackNavigator({
  ProfileView: ProfileViewScreen,
  conversationFlow,
});

const connectionFlow = createStackNavigator({
  ConnectionScreen,
  // ProfileView: ProfileViewScreen,
  profileViewFlow,
});

connectionFlow.navigationOptions = {
  title: "Neighbours",
  tabBarIcon: (
    <Ionicons name="ios-people" size={25} color={colors.text.title} />
  ),
};

const communityFlow = createStackNavigator({
  CommunityScreen,
  CommunityAddScreen,
  CommunityViewScreen,
});
const notificationFlow = createStackNavigator({
  NotificationScreen,
});
const streamFlow = createStackNavigator({
  PostFeed: PostFeedScreen,
  // Stream: StreamScreen,
  // StreamAdd: StreamAddScreen,
});
// const billingFlow = createStackNavigator({
//   PostFeed: PostFeedScreen,
//   // Stream: StreamScreen,
//   // StreamAdd: StreamAddScreen,
// });

const settingFlow = createStackNavigator({
  Setting: SettingScreen,
});

const visitorFlow = createStackNavigator({
  Visitor: VisitorScreen,
  VisitorView: VisitorViewScreen,
  VisitorAdd: VisitorAddScreen,
});

const chatFlow = createStackNavigator({
  // Chat: ChatScreen,
  messageFlow,
});

// billingFlow.navigationOptions = {
//   title: "Neighbours",
//   tabBarIcon: (
//     <Ionicons name="ios-people" size={25} color={colors.text.title} />
//   ),
// };

conversationFlow.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

MyBillingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

ProfileViewScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ServiceScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
BillingAddScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ResidentRegistrationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
CommunityRegistrationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

FeedbackScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ServiceDetailScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
MessageScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ServiceAddScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
AppInfoScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

messageFlow.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
communityFlow.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

// visitorFlow.navigationOptions = () => {
//   return {
//     headerShown: false,
//   };
// };


visitorFlow.navigationOptions = {
  title: "Visitor",
  tabBarIcon: (
    <FontAwesome
      name="car"
      size={20}
      color={colors.text.title}
    ></FontAwesome>
  ),
};

VisitorScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
VisitorAddScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
VisitorViewScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

CommunityScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
CommunityAddScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
CommunityViewScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
profileViewFlow.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
NotificationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ConnectionScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

ConversationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
PortfolioNoteScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ExploreScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

PostViewScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
DashboardScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

AddPostScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

streamFlow.navigationOptions = {
  title: "Post",
  tabBarIcon: (
    <FontAwesome5
      name="stream"
      size={20}
      color={colors.text.title}
    ></FontAwesome5>
  ),
};

notificationFlow.navigationOptions = {
  title: "Notification",
  tabBarIcon: (
    <MaterialCommunityIcons
      name="bell-alert"
      size={20}
      color={colors.text.title}
    ></MaterialCommunityIcons>
  ),
};

settingFlow.navigationOptions = {
  title: "Setting",
  tabBarIcon: <AntDesign name="setting" size={20}></AntDesign>,
};

myBillingFlow.navigationOptions = {
  title: "Billing",
  tabBarIcon: (
    <MaterialIcons
      name="monetization-on"
      size={20}
      color={colors.text.title}
    ></MaterialIcons>
  ),
};

chatFlow.navigationOptions = {
  title: "Chat",
  tabBarIcon: (
    <Ionicons
      name="md-chatboxes"
      size={20}
      color={colors.text.title}
    ></Ionicons>
  ),
};

SettingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ChatScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

MyProfileScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

PostFeedScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const switchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  anonymousFlow: createSwitchNavigator({
    Login: LoginScreen,
    loginWithEmailFlow: createStackNavigator({
      LoginWithEmail: {
        screen: LoginWithEmailScreen,
        navigationOptions: { title: "Email", headerShown: false },
      },
      Register: RegisterScreen,
    }),
  }),
  Welcome: WelcomeScreen,
  userFlow: createDrawerNavigator(
    {
      homeFlow: createBottomTabNavigator({
        // dashboardFlow,
        //  stockFlow,
        //  streamFlow,
        myBillingFlow,
        // notificationFlow,
        visitorFlow,
        //  connectionFlow,
        //  chatFlow,
      }),
      profileFlow: createStackNavigator({
        Profile: MyProfileScreen,
        AddPost: AddPostScreen,
        PostView: PostViewScreen,
      }),
      //   ProfileScreen: {
      //     screen: ProfileScreen,
      //     navigationOptions: {
      //       title: "Profile",
      //       drawerIcon: ({ tintColor }) => (
      //         <Feather name="user" size={16} color={tintColor}></Feather>
      //       ),
      //     },
      //   },
      exploreFlow,
      communityFlow,
      connectionFlow,
      messageFlow,
      serviceFlow,
      visitorFlow,
      // Notification: NotificationScreen,
      // PostFeed: PostFeedScreen,
      // SettingScreen,
      ResidentRegistrationScreen,
      CommunityRegistrationScreen,
      AppInfoScreen,
      FeedbackScreen,
    },
    { contentComponent: (props) => <DrawerScreen {...props}></DrawerScreen> }
  ),
});

LoginScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
// StockScreen.navigationOptions = () => {
//   return {
//     headerShown: false,
//   };
// };

StreamScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const App = createAppContainer(switchNavigator);

export default App;
