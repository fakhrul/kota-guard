import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components";
const MyBillingScreen = ({ navigation }) => {
    return (
        <View>
            <Header
                title="My Billing"
                navigation={navigation}
            >
            </Header>

        </View>
    )
}
export default MyBillingScreen;
