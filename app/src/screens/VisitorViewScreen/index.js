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
const visitDateFormated= moment(visitDate).format("LLLL");

        content = (
            < View style={styles.content}>
                <View style={{ height: 20 }}></View>
                <Text>Visitor Name</Text>
                <TextInput style={styles.textInput} editable={false} value={visitorName} ></TextInput>

                <Text>Visit Date</Text>
                <TextInput style={styles.textInput} editable={false} value={visitDateFormated} ></TextInput>
                <Text>Plate Number</Text>
                <TextInput style={styles.textInput} editable={false} value={plateNumber} ></TextInput>
                <Text>Unit</Text>
                <TextInput style={styles.textInput} editable={false} value={unitName} ></TextInput>
                <Text>Hosted By</Text>
                <TextInput style={styles.textInput} editable={false} value={hostName} ></TextInput>
                <Text>Created By</Text>
                <TextInput style={styles.textInput} editable={false} value={creatorName} ></TextInput>
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
        width: responsiveWidth(98),
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5
    }
});
export default VisitorViewScreen;
