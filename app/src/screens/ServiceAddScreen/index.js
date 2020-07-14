import React, { useState, useRef, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import FormInput from "./components/FormInput";
import { colors } from "../../utils";
import { MUTATION_ADD_SERVICE } from "../../graphql/mutation";
import {
  postUploadedNotification,
  uploadErrorNotification,
} from "../../utils";
import { Header, Button } from "./../../components";
import { Feather } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";

const ServiceAddScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const [addService] = useMutation(MUTATION_ADD_SERVICE);
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
  });

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value
    });
  }

  const upload = async () => {
    try {
      setIsUploading(true);
      const {
        data: {
          addService: { id: serviceId },
        },
      } = await addService({
        variables: {
          userId: state.userId,
          communityId: state.communityId,
          name: form.name,
          description: form.description,
          amount: form.amount,
        },
      });
      console.log("3");

      setIsUploading(false);
      postUploadedNotification();
    } catch ({ message }) {
      uploadErrorNotification("Post");
      setIsUploading(false);
      console.log(message);
      // crashlytics.recordCustomError(Errors.ASSET_UPLOAD, message);
    }
  };

  const Icon = () => (
    <Feather name="upload-cloud" color={colors.white} size={20} />
  );

  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const onMorePress = () => { };

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} style={styles.container}>
      <Header
        title="New Service"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <FormInput
          label="Name"
          placeholder="Service name..."
          value={form.name}
          onChangeText={(value) => onInputChanged(value, "name")}
        //   characterRestriction={200}
        />
        <FormInput
          multiline
          label="Description"
          placeholder="Description..."
          value={form.address}
          onChangeText={(value) => onInputChanged(value, "address")}
          characterRestriction={200}
        />
        <FormInput
          multiline
          label="Amount (RM)"
          placeholder="0.00"
          value={form.city}
          onChangeText={(value) => onInputChanged(value, "city")}
        />

      </ScrollView>
      <Button
        Icon={Icon}
        label="Save"
        onPress={upload}
        loading={isUploading}
        containerStyle={styles.uploadButton}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  uploadButton: {
    marginVertical: 20,
    marginBottom: 40,
  },
});
export default ServiceAddScreen;
