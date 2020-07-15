import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components";
import VisitorCardPlaceHolder from "./components/VisitorCardPlaceHolder"

const VisitorScreen = ({ navigation }) => {
    let content = <VisitorCardPlaceHolder></VisitorCardPlaceHolder>
    return (
        <View>
            <Header
                title="Visitor"
                navigation={navigation}
            >
            </Header>
            {content}
        </View>
    )
}
export default VisitorScreen;
