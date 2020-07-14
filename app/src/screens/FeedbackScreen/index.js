import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components";
const FeedbackScreen = ({ navigation }) => {
    return (
        <View>
            <Header
                title="Feedback"
                navigation={navigation}
            >
            </Header>

        </View>
    )
}
export default FeedbackScreen;
