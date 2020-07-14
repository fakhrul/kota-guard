import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import {colors} from "../../../utils";

export default class SidebarLink extends Component {
  render() {
    const navigateToScreen = (route) => () => {
      this.props.navigation.navigate(route)
      this.props.navigation.closeDrawer();
    };

    return (
      <View
        style={
          {
            //   borderWidth: 1,
          }
        }
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            // borderWidth: 1,
            width: "100%",
            padding: 15,
            paddingLeft: 20,
            alignContent:"center"
          }}
          onPress={navigateToScreen(this.props.route)}  
            // navigateToScreen(this.props.route)}
        >
          <View style={{
              width:20,
              height:20,
              alignContent:"center",
              justifyContent: "center"
          }}>{this.props.icon}</View>
          <Text
            style={{
              marginLeft: 30,
              fontWeight: "bold",
              fontSize: 15,
              color: colors.text.title
            }}
          >
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// const SidebarLink = ({ title, icon,  ...props }) => {
//   return (
//     <View
//       style={
//         {
//           //   borderWidth: 1,
//         }
//       }
//     >
//       <TouchableOpacity
//         style={{
//           flexDirection: "row",
//           // borderWidth: 1,
//           width: "100%",
//           padding: 12,
//           paddingLeft: 20,
//         }}
//       >
//         <View></View>
//         <Text
//           style={{
//             marginLeft: 30,
//             fontWeight: "bold",
//             fontSize: 15,
//           }}
//         >
//           <View>{icon}</View>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SidebarLink;
