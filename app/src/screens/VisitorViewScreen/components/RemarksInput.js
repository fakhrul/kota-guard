import React, { useState, useContext } from "react";
import { Keyboard, View, StyleSheet, Platform, TextInput } from "react-native";
import {
  colors,
  inputLimitErrorNotification,
  createAsyncDelay,
} from "../../../utils";
import { NativeImage, LoadingIndicator, IconButton } from "../../../components/atoms";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../../context/AuthContext.js";
import { MUTATION_ADD_REMARKS } from "../../../graphql/mutation";
import { useMutation } from "@apollo/react-hooks";

const RemarksInput = ({ visitorId, scrollViewRef }) => {
  const { state } = useContext(AuthContext);
  const [remarks, setRemarks] = useState("");
  const [addRemarks, { loading }] = useMutation(MUTATION_ADD_REMARKS);

  const postRemarks = async () => {
    if (remarks.length < 1) {
      inputLimitErrorNotification("Remarks", "more", 1);
      return;
    }
    if (remarks.length > 200) {
      inputLimitErrorNotification("Remarks", "less", 200);
      return;
    }
    await addRemarks({
      variables: { userId: state.userId, visitorId, caption:"GENERAL", body: remarks },
    });
    Keyboard.dismiss();
    setRemarks("");
    await createAsyncDelay(1200);
    scrollViewRef.current.scrollToEnd();
  };

  const Icon = () => (
    <MaterialIcons name="done" size={24} color={colors.accent} />
  );

  let content = (
    <View style={styles.loading}>
      <LoadingIndicator color={colors.accent} size={4}></LoadingIndicator>
    </View>
  );
  if (!loading) {
    content = (
      <IconButton
        Icon={Icon}
        onPress={postRemarks}
        style={styles.postButton}
      ></IconButton>
    );
  }
  return (
    <View style={styles.container}>
      <NativeImage
        uri={state.currentUser.avatar}
        style={styles.commentAvatarImage}
      />
      <TextInput
        style={styles.commentTextInput}
        value={remarks}
        placeholder={`Add a remarks as ${state.currentUser.handle}...`}
        placeholderTextColor={colors.text02}
        onChangeText={setRemarks}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopColor: colors.translucent,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.base,
  },
  commentAvatarImage: {
    height: 36,
    width: 36,
    backgroundColor: colors.placeholder,
    marginRight: 10,
    borderRadius: 50,
  },
  commentTextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.select({ ios: 8, android: 6 }),
    paddingHorizontal: 20,
    backgroundColor: colors.placeholder,
    color: colors.text01,
    borderRadius: 20,
    marginVertical: 5,
  },
  loading: {
    marginLeft: 10,
  },
  postButton: {
    width: undefined,
    marginLeft: 10,
  },
});

export default RemarksInput;
