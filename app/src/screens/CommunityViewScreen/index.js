import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, Button } from "react-native";
import CommunityScreenPlaceholder from "./components/CommunityScreenPlaceholder";

import { QUERY_COMMUNITY } from "../../graphql/query";
import {
    Header,

} from "../../components";
import {
    colors
} from "../../utils";
import { MUTATION_ADD_RESIDENT } from "../../graphql/mutation";
import { Context as AuthContext } from "../../context/AuthContext";

const CommunityViewScreen = ({ navigation }) => {
    const communityId = navigation.getParam("communityId");
    const { state, updateCommunityId } = useContext(AuthContext);
    const [addResident, {loading: addResidentLoading}] = useMutation(MUTATION_ADD_RESIDENT);

    const { data, loading, error } = useQuery(QUERY_COMMUNITY, {
        variables: { id: communityId },
        pollInterval: 1000,
        fetchPolicy: "network-only",
    });

    const onMorePress = () => { };
    
    const onRequestToJoin = () => {
        console.log("onRequestToJoin")
        addResident({variables: {userId: state.userId, residentId: state.userId, communityId: communityId}});
        updateCommunityId({ communityId });

    };

    let content = <CommunityScreenPlaceholder viewMode />;
    if (!loading && !error) {
        console.log(data);
        const {
            community: {
                name,
                address,
                city,
                state,
                postcode,
                country,
                logo,
                creator: {
                    id: creatorId,
                    name: creatorName
                }
            },
        } = data;
        console.log("creatorId", creatorId)
        content = (
            <ScrollView>
                <View>
                    {/* <ImageBackground
                        source={{ uri: avatar ? avatar : "" }}
                        style={styles.avatar}
                        imageStyle={styles.avatarImage}
                    >
                    </ImageBackground> */}
                    <Text>Name: {name}</Text>
                    <Text>address: {address}</Text>
                    <Text>city: {city}</Text>
                    <Text>state: {state}</Text>
                    <Text>postcode: {postcode}</Text>
                    <Text>country: {country}</Text>
                    <Text>logo: {logo}</Text>
                    <Text>creator Name: {creatorName}</Text>
                </View>
                <Button title="request to join" onPress={onRequestToJoin}></Button>

            </ScrollView>
        );
    }
    return (
        <View style={styles.container}>
            <Header
                isBackButton
                title="Community View"
                navigation={navigation}
                onPress={onMorePress}
            ></Header>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.base,
    },
    postGrid: {
        flex: 1,
        marginHorizontal: 10,
    },
    profileOptions: {
        flex: 1,
        alignItems: "flex-end",
    },
});

export default CommunityViewScreen;
