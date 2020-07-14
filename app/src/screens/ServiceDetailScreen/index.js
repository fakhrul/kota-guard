import React, { useContext, useState, useEffect } from "react";
import { View, Text , Button} from "react-native";
import { Header } from "../../components";
import { Context as AuthContext } from "../../context/AuthContext";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_SERVICE } from "../../graphql/query";

const ServiceDetailScreen = ({ navigation }) => {
    const serviceId = navigation.getParam("serviceId");
    const { state } = useContext(AuthContext);

    const [serviceData, setServiceData] = useState(null);
    const [
        queryService,
        {
            data: data,
            called: called,
            loading: loading,
            error: error,
        },
    ] = useLazyQuery(QUERY_SERVICE, {
        variables: { id: serviceId },
        fetchPolicy: "network-only",
    });

    const navigateToBillingAdd = () => {
        navigation.navigate("BillingAdd", {serviceId : serviceId});
    }

    useEffect(() => {
        if (called && !loading) {
            setServiceData(data);
        } else if (!called) {
            queryService();
        }
    }, [
        data,
        called,
        loading
    ]);

    let content = <View></View>;

    if (called && !loading && !error && data) {
        console.log(data)
        const {
            service: {
                name,
                description,
                amount,
                createdAt,
                creator: {
                    name: creatorName
                }
            },
        } = data;

        content = (
            <View>
                <Text>Name : {name}</Text>
                <Text>Description : {description}</Text>
                <Text>Amount : {amount}</Text>
                <Text>Creator : {creatorName}</Text>
                <Text>Created At : {createdAt}</Text>
            </View>
        );
    }

    return (
        <View>
            <Header
                title="Service Detail"
                navigation={navigation}
            >

            </Header>
            <Text>Service Detail</Text>
            {content}
            <Button title="Add Billing" onPress={navigateToBillingAdd()}></Button>
        </View>
    )
}

export default ServiceDetailScreen;