import React, { useRef, useContext } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { Header, SvgBanner } from "../../components";
import { Modalize } from "react-native-modalize";
import SettingsBottomSheet from "./components/SettingsBottomSheet";
import { colors } from "../../utils";
import { QUERY_SERVICE_BY_COMMUNITY } from "../../graphql/query";
import { useQuery } from "@apollo/react-hooks";
import { Context as AuhtContext } from "../../context/AuthContext";
import { FlatGrid } from "react-native-super-grid";
import ServiceCard from "./components/ServiceCard";
import ServiceCardPlaceholder from "./components/ServiceCardPlaceholder";
import EmptyFeed from "../../resources/empty-feed.svg";

const ServiceScreen = ({ navigation }) => {
  const { state } = useContext(AuhtContext);
  const settingsBottomSheetRef = useRef(null);

  const {
    data: serviceData,
    loading: serviceLoading,
    error: serviceError,
    refetch: serviceRefetch
  } = useQuery(QUERY_SERVICE_BY_COMMUNITY, {
    variables: { communityId: state.communityId },
    fetchPolicy: "network-only"
  })

  const refreshControl = () => {
    console.log("refresh");
    const onRefresh = () => {
      try {
        serviceRefetch();
      } catch { }
    }

    return (
      <RefreshControl
        tintColor={colors.text02}
        refreshing={serviceLoading}
        onRefresh={onRefresh}
      >
      </RefreshControl>
    )
  }
  const onMorePress = () => {
    settingsBottomSheetRef.current?.open();
  };

  const onAddService = () => {
    settingsBottomSheetRef.current?.close();
    navigation.navigate("ServiceAdd");
  };

  const renderItem = ({ item }) => {
    console.log("item", item);
    const { id, name, amount } = item;
    return (
      <ServiceCard
        navigation={navigation}
        id={id}
        name={name}
        amount={amount}
      >

      </ServiceCard>
    )
  }

  let content = <ServiceCardPlaceholder></ServiceCardPlaceholder>
  if (!serviceLoading && !serviceError) {
    console.log("service", serviceData);
    const { servicesByCommunity } = serviceData;

    content = (
      <FlatGrid
        refreshControl={refreshControl()}
        showsVerticalScrollIndicator={false}
        items={servicesByCommunity}
        ListEmptyComponent={() => (
          <SvgBanner
            Svg={EmptyFeed}
            spacing={20}
            placeholder={`Let's create new service. Eg Security Charges`}
          >
          </SvgBanner>
        )}
        style={styles.serviceList}
        spacing={20}
        renderItem={renderItem}
      >

      </FlatGrid>
    )

  }

  return (
    <View style={styles.container}>
      <Header
        title="Service"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      {content}
      <Modalize
        ref={settingsBottomSheetRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles.settingContainer}
        adjustToContentHeight
      >
        <SettingsBottomSheet onAddService={onAddService}></SettingsBottomSheet>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // borderWidth: 1
  },
  content: {
    flex: 1,
  },
  fadeView: {
    flex: 1,
  },
  settingContainer: {
    padding: 20,
    backgroundColor: colors.base,
  },
  avatarImage: {
    height: 44,
    width: 44,
    backgroundColor: colors.placeholder,
    borderRadius: 45,
    marginRight: 10,
  },
  serviceList: {
    flex: 1,
  },
});

export default ServiceScreen;
