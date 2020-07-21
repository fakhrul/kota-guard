import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeImage } from "../../../components";
import { colors, parseLikes } from "../../../utils";
import { AntDesign } from "@expo/vector-icons";
import { Context as AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import { responsiveWidth } from 'react-native-responsive-dimensions';


const VisitorCard = ({ navigation, id, visitorName, visitDate, plateNumber, remarks, creatorName, unitName, hostName }) => {
    const { state } = useContext(AuthContext);
    const navigateToVisitor = () => navigation.navigate("VisitorView", { postId: id });

    return (
        <TouchableOpacity
            onPress={navigateToVisitor}
            activeOpacity={0.9}
            style={styles.container}
        >
            <View style={styles.lowerContent}>
                <Text>Id {id}</Text>
                <Text>Name {visitorName}</Text>
                <Text>Date {visitDate}</Text>
                <Text>Plate {plateNumber}</Text>
                <Text>Remarks {remarks}</Text>
                <Text>Unit {unitName}</Text>
                <Text>Creator {creatorName}</Text>
                <Text>Host {hostName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: responsiveWidth(90),
        width: responsiveWidth(90),
        alignSelf: "center",
        justifyContent: "space-between",
        backgroundColor: colors.black,
        overflow: "hidden",
        borderRadius: 10,
    },
    postImage: {
        position: "absolute",
        height: responsiveWidth(90),
        width: responsiveWidth(90),
    },
    avatarImage: {
        height: 44,
        width: 44,
        backgroundColor: colors.placeholder,
        borderRadius: 45,
        marginRight: 10,
    },
    upperContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: colors.translucent,
    },
    lowerContent: {
        justifyContent: "center",
        padding: 16,
        backgroundColor: colors.translucent,
    },
    likeContent: {
        flexDirection: "row",
    },
    handleText: {
        fontSize: 16,
        color: colors.white,
    },
    timeText: {
        fontSize: 14,
        color: colors.white,
        marginTop: 2,
    },
    likesText: {
        fontSize: 16,
        marginLeft: 8,
        color: colors.white,
    },
    captionText: {
        fontSize: 16,
        color: colors.white,
        marginTop: 5,
    },
});

export default VisitorCard;
