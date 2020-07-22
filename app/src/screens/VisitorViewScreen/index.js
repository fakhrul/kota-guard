import React, { useState, useContext, useEffect, useRef } from "react";
import {  ScrollView, View, Text, StyleSheet, Button, TextInput } from "react-native";
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

        content = (
            < View >
                <Text>Id {id}</Text>
                <Text>Name {visitorName}</Text>
                <Text>Date {visitDate}</Text>
                <Text>Plate {plateNumber}</Text>
                {/* <Text>Remarks {remarks}</Text> */}
                <Text>Unit {unitName}</Text>
                <Text>Creator {creatorName}</Text>
                <Text>Host {hostName}</Text>
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
});
export default VisitorViewScreen;
