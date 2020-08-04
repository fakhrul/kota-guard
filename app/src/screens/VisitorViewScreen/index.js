import React, { useState, useContext, useEffect, useRef } from "react";
import { ScrollView, View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Header } from "../../components";
import { Context as AuthContext } from "../../context/AuthContext";
import { QUERY_VISITOR } from "../../graphql/query";
import {
    useLazyQuery,
    useMutation,
    useSubscription,
} from "@apollo/react-hooks";
import Remarks from "./components/Remarks";
import RemarksInput from "./components/RemarksInput";
import { colors } from "../../utils";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import moment from "moment";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";

const VisitorViewScreen = ({ navigation }) => {
    const { state } = useContext(AuthContext);
    const onMorePress = () => { };
    const visitorId = navigation.getParam("visitorId");
    const [visitData, setVisitData] = useState(null);
    const scrollViewRef = useRef();
    const [
        queryVisitor,
        {
            data: visitorData,
            called: visitorCalled,
            loading: visitorLoading,
            error: visitorError,
        },
    ] = useLazyQuery(QUERY_VISITOR, {
        variables: { id: visitorId },
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (visitorCalled && !visitorLoading) {
            setVisitData(visitorData);
        } else if (!visitorCalled) {
            queryVisitor();
        }

    }, [
        visitorData,
        visitorCalled,
        visitorLoading
    ]);


    let content = (
        <View>
            <Text>Loading</Text>
        </View>
    )
    if (visitorCalled && !visitorLoading && !visitorError && visitorData) {
        const {
            visitor: {
                id,
                visitorName,
                visitDate,
                plateNumber,
                remarks,
                creator: {
                    name: creatorName
                },
                unit: {
                    name: unitName
                },
                host: {
                    name: hostName
                },
                comments
            },
        } = visitorData;
        // console.log(visitorData)
        const visitDateFormated = moment(visitDate).format("LLLL");

        content = (
            < View style={styles.content}>
                <View style={{ height: 20 }}></View>
                <Text>Visiting Time</Text>

                <View style={styles.mainView}>
                    <View style={styles.mainLogo}>
                        <MaterialCommunityIcons
                            name="calendar-today"
                            size={35}
                            color="#C4C4C4"
                        ></MaterialCommunityIcons>
                    </View>
                    <Text style={styles.mainText, { fontSize: 15 }}>{visitDateFormated}</Text>
                </View>
                <Text>Visitor Details</Text>

                <View style={styles.mainView}>
                    <View style={styles.mainLogo}>
                        <FontAwesome5
                            name="walking"
                            size={30}
                            color="#C4C4C4"
                        ></FontAwesome5>
                    </View>
                    <Text style={styles.mainText}>{visitorName}</Text>
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
                <Text>Host Details</Text>

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
                <Text style={styles.creator}>Created By {creatorName} </Text>
                <Remarks
                    navigation={navigation}
                    visitorId={visitorId}
                    remarks={remarks}
                ></Remarks>
            </View >
        );

    }

    return (
        <View style={styles.container}>
            <Header
                title="Visitor Detail"
                isBackButton={true}
                navigation={navigation}
                onPress={onMorePress}
            ></Header>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                style={styles.content}
            >
                {content}
            </ScrollView>
            <RemarksInput visitorId={visitorId} scrollViewRef={scrollViewRef} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4",
    },
    content: {
        alignSelf: "center",
        backgroundColor: colors.white,
        width: responsiveWidth(100),
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5
    },
    mainView: { borderWidth: 1, borderRadius: 15, borderColor: "#C4C4C4", marginHorizontal: 10, marginVertical: 5, height: 50, flexDirection: "row", alignItems: "center", alignContent: "center" },
    mainLogo: { height: 40, width: 40, alignContent: "center", alignSelf: "center", alignItems: "center", marginHorizontal: 10 },
    mainText: { fontSize: 19, fontFamily: 'Roboto', fontWeight: "bold", alignSelf: "center" },

});
export default VisitorViewScreen;
