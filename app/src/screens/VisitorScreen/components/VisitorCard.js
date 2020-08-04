import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeImage } from "../../../components"; 2
import { colors, parseLikes } from "../../../utils";
import { AntDesign } from "@expo/vector-icons";
import { Context as AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";

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
                <View style={styles.mainView}>
                    <View style={styles.mainLogo}>
                        <FontAwesome5
                            name="user-edit"
                            size={30}
                            color="#C4C4C4"
                        ></FontAwesome5>
                    </View>
                    <Text style={styles.mainText}>{hostName}</Text>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.mainLogo}>

                        <Ionicons name="ios-home" size={35} color="#C4C4C4" />

                    </View>
                    <Text style={styles.mainText}>{unitName}</Text>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.mainLogo}>
                        <FontAwesome
                            name="car"
                            size={30}
                            color="#C4C4C4"
                        ></FontAwesome>
                    </View>
                    <Text style={styles.mainText}>{plateNumber}</Text>
                </View>
                <View style={styles.dateView}>
                    <View style={styles.dateLogo}>
                        <MaterialCommunityIcons
                            name="calendar-today"
                            size={20}
                            color="#C4C4C4"
                        ></MaterialCommunityIcons>
                    </View>
                    <Text style={styles.dateText}>{visitDateFormated}</Text>
                </View>
                {/* <Text>Visitor Name: {visitorName}</Text>
                <Text>Car Plate No: {plateNumber}</Text>
                <Text>Requested By: {creatorName}</Text>
                <Text>Destination: {unitName}</Text> */}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 215,
        width: responsiveWidth(100),
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
    mainView: { height: 50, flexDirection: "row", alignItems: "center" },
    mainLogo: { height: 40, width: 40, alignContent: "center", alignSelf: "center", alignItems: "center", marginHorizontal: 10 },
    mainText: { fontSize: 19, fontFamily: 'Roboto', fontWeight: "bold" },
    dateView: { height: 20, marginTop:10, flexDirection: "row", alignItems: "center" },
    dateLogo: { height: 20, width: 20, alignContent: "center", alignSelf: "center", alignItems: "center", marginHorizontal: 10 },
    dateText: { fontSize: 14, fontFamily: 'Roboto', fontStyle:"italic", color:"#C4C4C4" },
});

export default VisitorCard;
