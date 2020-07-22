import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeImage } from "../../../components";
import { colors, parseLikes } from "../../../utils";
import { AntDesign } from "@expo/vector-icons";
import { Context as AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import { responsiveWidth } from 'react-native-responsive-dimensions';

const VisitorCard = ({ navigation, id, visitorName, visitDate, plateNumber, creatorName, unitName, hostName }) => {
    const { state } = useContext(AuthContext);
    const navigateToVisitor = () => navigation.navigate("VisitorView", { visitorId: id });
    const visitDateFormated = moment(visitDate).format("LLLL");

    return (
        <TouchableOpacity
            onPress={navigateToVisitor}
            activeOpacity={0.9}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text>Date: {visitDateFormated}</Text>
                <Text>Visitor Name: {visitorName}</Text>
                <Text>Car Plate No: {plateNumber}</Text>
                <Text>Requested By: {creatorName}</Text>
                <Text>Host Name: {hostName}</Text>
                <Text>Destination: {unitName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // height: responsiveWidth(90),
        width: responsiveWidth(98),
        alignSelf: "center",
        justifyContent: "space-between",
        backgroundColor: colors.black,
        overflow: "hidden",
        borderRadius: 0,
    },
      content: {
        justifyContent: "center",
        padding: 16,
        backgroundColor: colors.white,
    },
  
});

export default VisitorCard;
