import React, {useRef} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components";
import VisitorCardPlaceHolder from "./components/VisitorCardPlaceHolder"
import SettingsBottomSheet from "./components/SettingsBottomSheet";
import { Modalize } from "react-native-modalize";
import { colors, sortPostsAscendingTime } from "../../utils";

const VisitorScreen = ({ navigation }) => {
    const settingBottomSheetRef = useRef(null);

    const onMorePress = () => {
        settingBottomSheetRef.current?.open();
      };
    
      const onAddVisitor = () => {
        settingBottomSheetRef.current?.close();
        navigation.navigate("VisitorAdd");
      };

      
    let content = <VisitorCardPlaceHolder></VisitorCardPlaceHolder>
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
  });
export default VisitorScreen;
