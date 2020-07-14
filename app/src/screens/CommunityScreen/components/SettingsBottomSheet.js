import React, {useContext} from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { BottomSheetHeader, Option } from "../../../components";

const SettingsBottomSheet = ({ onAddCommunity }) => {

  return (
    <SafeAreaView
      style={{
        // borderWidth: 1,
        flex: 1,
      }}
    >
      <BottomSheetHeader header="Options" subHeader="Community options" />
      <View style={styles.content}>
        <Option
          label="Add new community"
          iconName="md-add-circle-outline"
          onPress={onAddCommunity}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsBottomSheet;
