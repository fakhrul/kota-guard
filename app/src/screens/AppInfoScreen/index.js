import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components";
const AppInfoScreen = ({ navigation }) => {
    return (
        <View>
            <Header
                title="App Info"
                navigation={navigation}
            >
            </Header>

        </View>
    )
}
export default AppInfoScreen;
