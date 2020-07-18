import React, {useContext} from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { BottomSheetHeader, Option } from "../../../components";

const SettingsBottomSheet = ({ onAddVisitor }) => {

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <BottomSheetHeader header="Options" subHeader="Visitor options" />
      <View style={styles.content}>
        <Option
          label="New Visitor"
          iconName="md-add-circle-outline"
          onPress={onAddVisitor}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsBottomSheet;
