import React, { useRef, useContext } from "react";
import { RefreshControl, View, Text, StyleSheet } from "react-native";
import { SvgBanner, Header } from "../../components";
import VisitorCardPlaceHolder from "./components/VisitorCardPlaceHolder"
import SettingsBottomSheet from "./components/SettingsBottomSheet";
import { Modalize } from "react-native-modalize";
import { colors, sortPostsAscendingTime } from "../../utils";
import { Context as AuthContext } from "../../context/AuthContext";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_VISITOR_BY_HOST } from "../../graphql/query";
import { FlatGrid } from "react-native-super-grid";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VisitorCard from "./components/VisitorCard";

const VisitorScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const settingBottomSheetRef = useRef(null);

  const {
    data: visitorData,
    loading: visitorLoading,
    error: visitorError,
    refetch: visitorRefetch,
  } = useQuery(QUERY_VISITOR_BY_HOST, {
    variables: { hostId: state.userId },
    fetchPolicy: "network-only",
  });

  const onMorePress = () => {
    settingBottomSheetRef.current?.open();
  };

  const onAddVisitor = () => {
    settingBottomSheetRef.current?.close();
    navigation.navigate("VisitorAdd");
  };

  const refreshControl = () => {
    const onRefresh = () => {
      try {
        visitorRefetch();
      } catch { }
    };

    return (
      <RefreshControl
        tintColor={colors.text02}
        refreshing={visitorLoading}
        onRefresh={onRefresh}
      />
    );
  };


  const renderItem = ({ item }) => {
    const { id,
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
      }
    } = item;
    console.log(item)
    return (
      <VisitorCard
        navigation={navigation}
        id={id}
        visitorName={visitorName}
        visitDate={visitDate}
        plateNumber={plateNumber}
        remarks={remarks}
        creatorName={creatorName}
        unitName={unitName}
        hostName={hostName}
      >

      </VisitorCard>

    );
  };

  let content = <VisitorCardPlaceHolder></VisitorCardPlaceHolder>
  if (!visitorLoading && !visitorError) {
    const { visitorsByHost } = visitorData;
    content = (
      <FlatGrid
        refreshControl={refreshControl()}
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={visitorsByHost}
        ListEmptyComponent={() => (
          <SvgBanner
            Svg={EmptyFeed}
            spacing={20}
            placeholder={`Visitor list is empty..`}
          />
        )}
        style={styles.visitorList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Visitor"
        navigation={navigation}
        onPress={onMorePress}
      >
      </Header>
      {content}
      <Modalize
        ref={settingBottomSheetRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles.settingContainer}
        adjustToContentHeight
      >
        <SettingsBottomSheet
          onAddVisitor={onAddVisitor}
        ></SettingsBottomSheet>
      </Modalize>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  settingContainer: {
    padding: 20,
    backgroundColor: colors.base,
  },
  visitorList: {
    flex: 1,
  },
});
export default VisitorScreen;
