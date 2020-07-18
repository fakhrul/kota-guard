import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components";
import { colors } from "../../utils";
import InputCustom from "./components/InputForm";

const VisitorAddScreen = ({ navigation }) => {
  const [form, setForm] = new useState({
    displayName: "",
    email: "",
    password: "",
    isLoading: false,
  });

  const onMorePress = () => {};

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };


  return (
    <View style={styles.container}>
      <Header
        title="Register Visitor"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      <InputCustom
        placeholder="Full Name"
        value={form.displayName}
        onChangeText={(value) => onInputChanged(value, "displayName")}
      ></InputCustom>
      <InputCustom
        placeholder="Date"
        value={form.displayName}
        onChangeText={(value) => onInputChanged(value, "displayName")}
      ></InputCustom>
      <View style={{ height: 20 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
});
export default VisitorAddScreen;
