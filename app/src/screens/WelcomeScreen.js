import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { QUERY_USER_EXISTS } from "../graphql/query";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MUTATION_CREATE_USER } from "../graphql/mutation";
import client from "../graphql/client";

const WelcomeScreen = ({ navigation }) => {
  const { state, updateUserId, updateCommunityId } = useContext(AuthContext);

  const [createUser] = useMutation(MUTATION_CREATE_USER);

  const { photoURL: avatar, displayName: name, email } = state.currentUser;
  const { data, loading, error } = useQuery(QUERY_USER_EXISTS, {
    variables: { email: email },
    pollInterval: 1000,
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (!loading && !error) {
      const {
        userExist

      } = data;

      if (!userExist) {
        const userId = createNewUser(email, name, avatar);
        updateUserId({ userId });
        navigateHome();
      } else {
        const {
          id: userId,
          community: {
            id: communityId
          }
        } = userExist;

        updateUserId({ userId });
        updateCommunityId({ communityId });
        navigateHome();
      }
      // navigateHome();

    }
  });

  const navigateHome = () => {
    navigation.navigate("userFlow");
  };

  const createNewUser = async (email: string, name: string, avatar: string | null) => {
    const {
      data: {
        createUser: { id: userId },
      },
    } = await createUser({
      variables: { name, email, avatar },
    });
    return await userId;
  };





  return (
    <View>
      <Text>Welcome Screen</Text>
      <Text>There is a problem during the sign in</Text>
      <Button title="Go to home page" onPress={navigateHome}></Button>
    </View>
  );
};

export default WelcomeScreen;
