import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components";
const VisitorScreen = ({ navigation }) => {
    return (
        <View>
            <Header
                title="Visitor"
                navigation={navigation}
            >
            </Header>

        </View>
    )
}
export default VisitorScreen;
