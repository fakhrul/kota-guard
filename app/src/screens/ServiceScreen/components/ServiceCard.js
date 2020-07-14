import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { colors } from "../../../utils";

const ServiceCard = ({ navigation, id, name, amount }) => {
    const navigateToServiceDetail = () => {
        navigation.navigate("ServiceDetail", { serviceId: id });
    }
    return (
        <View style={styles.container}>
            <Text>Service Details</Text>
            <Text>id : {id}</Text>
            <Text>name : {name}</Text>
            <Text>amount : {amount}</Text>
            <Button title="View Detail"
                onPress={navigateToServiceDetail}></Button>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        //   height: responsiveWidth(90),
        //   width: responsiveWidth(90),
        alignSelf: "center",
        backgroundColor: colors.black,
        borderRadius: 10,
    },
});

export default ServiceCard;