import React, {useContext} from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { BottomSheetHeader, Option } from "../../../components";

const SettingsBottomSheet = ({ onAddService }) => {

  return (
    <SafeAreaView
      style={{
        // borderWidth: 1,
        flex: 1,
      }}
    >
      <BottomSheetHeader header="Options" subHeader="Service options" />
      <View style={styles.content}>
        <Option
          label="Add new service"
          iconName="md-add-circle-outline"
          onPress={onAddService}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsBottomSheet;
