import React, { useState, useRef, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import UploadBanner from "./components/UploadBanner";
import FormInput from "./components/FormInput";
import { colors } from "../../utils";
import { MUTATION_ADD_COMMUNITY } from "../../graphql/mutation";
import {
  inputLimitErrorNotification,
  noAssetInfoNotification,
  postUploadedNotification,
  uploadErrorNotification,
} from "../../utils";
import { uploadToStorage } from "../../config/firebase";
import { Header, Button } from "./../../components";
import { Feather } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";
import { formatError } from "graphql";

const CommunityAddScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const [pickedAsset, setPickedAsset] = useState("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [addCommunity] = useMutation(MUTATION_ADD_COMMUNITY);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    logo: "",
    creator: ""
  });

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value
    });
    // console.log(form);
  }
  const captionInputRef = useRef();

  const uploadImage = async () => {
    if (!pickedAsset) {
      noAssetInfoNotification();
      return;
    }

    if (caption.length > 200) {
      inputLimitErrorNotification("Caption", "less", 200);
      return;
    }
    try {
      setIsUploading(true);
      const remoteUri = await uploadToStorage(
        "post",
        pickedAsset,
        state.userId
      );
      // console.log("userId", state.userId);
      // console.log("remoteUri", remoteUri);
      // console.log("caption", caption);

      // @ts-ignore
      const {
        data: {
          addCommunity: { id: postId },
        },
      } = await addCommunity({
        variables: {
          userId: state.userId,
          name: form.name,
          address: form.address,
          city: form.city,
          state: form.state,
          postcode: form.postcode,
          country: form.country,
          logo: remoteUri,
        },
      });
      console.log("3");

      setIsUploading(false);
      setPickedAsset("");
      setCaption("");
      // @ts-ignore
      captionInputRef.current.clear();
      postUploadedNotification();
      // navigation.navigate("PostView", { postId });
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
        title="New Community"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <FormInput
          ref={captionInputRef}
          //   multiline
          label="Name"
          placeholder="Your community name..."
          value={form.name}
          onChangeText={(value) => onInputChanged(value, "name")}
        //   characterRestriction={200}
        />
        <FormInput
          ref={captionInputRef}
          multiline
          label="Address"
          placeholder="Address..."
          value={form.address}
          onChangeText={(value) => onInputChanged(value, "address")}
          characterRestriction={200}
        />
        <FormInput
          ref={captionInputRef}
          multiline
          label="City"
          placeholder="City..."
          value={form.city}
          onChangeText={(value) => onInputChanged(value, "city")}
          characterRestriction={200}
        />
        <FormInput
          ref={captionInputRef}
          multiline
          label="Postcode"
          placeholder="Postcode..."
          value={form.postcode}
          onChangeText={(value) => onInputChanged(value, "postcode")}
          characterRestriction={200}
        />
        <FormInput
          ref={captionInputRef}
          multiline
          label="State"
          placeholder="State..."
          value={form.state}
          onChangeText={(value) => onInputChanged(value, "state")}
          characterRestriction={200}
        />
        <FormInput
          ref={captionInputRef}
          multiline
          label="Country"
          placeholder="Country..."
          value={form.country}
          onChangeText={(value) => onInputChanged(value, "country")}
          characterRestriction={200}
        />
        <UploadBanner pickedAsset={pickedAsset} onAsset={setPickedAsset} />

      </ScrollView>
      <Button
        Icon={Icon}
        label="Upload"
        onPress={uploadImage}
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
export default CommunityAddScreen;
