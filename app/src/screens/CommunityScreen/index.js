import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  Header,
  AnimatedSearchBar,
  ExploreScreenPlaceholder,
  SearchUsersPlaceholder,
  SvgBanner,
  NativeImage
  
} from "../../components";
import { colors } from "../../utils";
import { Context as AuthContext } from "../../context/AuthContext";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { QUERY_SEARCH_COMMUNITY, QUERY_USER } from "../../graphql/query";
import SearchUsersBanner from "../../resources/search-users.svg";
import posed, { Transition } from "react-native-pose";
import CommunitySearchResults from "./components/CommunitySearchResults";
import { Modalize } from "react-native-modalize";
import SettingsBottomSheet from "./components/SettingsBottomSheet";

const FadeView = posed.View({
  enter: { opacity: 1 },
  exit: { opacity: 0.25 },
});

const CommunityScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const settingsBottomSheetRef = useRef(null);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [
    searchCommunityQuery,
    {
      data: searchCommunityQueryData,
      loading: searchCommunityQueryLoading,
      called: searchCommunityQueryCalled,
      error: searchCommunityQueryError,
    },
  ] = useLazyQuery(QUERY_SEARCH_COMMUNITY);

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useQuery(QUERY_USER, {
    variables: { id: state.userId },
    pollInterval: 1000,
    fetchPolicy: "network-only",
  });

  const onMorePress = () => {
    settingsBottomSheetRef.current?.open();
  };

  const onAddCommunity = () => {
    settingsBottomSheetRef.current?.close();
    navigation.navigate("CommunityAddScreen");
  };

  const onFocus = () => setIsSearchFocused(true);
  const onBlur = () => setIsSearchFocused(false);

  useEffect(() => {
    if (searchTerm !== "") {
      searchCommunityQuery({
        variables: { userId: state.userId, name: searchTerm },
      });
    }
    if (searchCommunityQueryCalled && !searchCommunityQueryLoading) {
      console.log("searchCommunityQueryData", searchCommunityQueryData);
      const { searchCommunity } = searchCommunityQueryData;
      setSearchResults(searchCommunity);
    }
  }, [
    searchTerm,
    searchCommunityQueryData,
    searchCommunityQueryCalled,
    searchCommunityQueryLoading,
  ]);

  let content = <ExploreScreenPlaceholder />;

  if (isSearchFocused) {
    let subContent;
    if (searchCommunityQueryCalled && searchCommunityQueryLoading) {
      subContent = <SearchUsersPlaceholder />;
    } else if (!searchCommunityQueryLoading && searchTerm === "") {
      subContent = (
        <SvgBanner
          Svg={SearchUsersBanner}
          spacing={16}
          placeholder="Search for community..."
        />
      );
    } else if (
      searchCommunityQueryCalled &&
      !searchCommunityQueryLoading &&
      !searchCommunityQueryError
    ) {
      console.log("communityResults", searchResults);
      subContent = (
        <CommunitySearchResults
          navigation={navigation}
          searchResults={searchResults}
        />
      );
    }

    content = (
      <Transition animateOnMount>
        <FadeView style={styles.fadeView} key="search-content">
          {subContent}
        </FadeView>
      </Transition>
    );
  } else {
    if (!profileLoading && !profileError) {
      console.log(profileData);
      const {
        getUser: {
          avatar,
          name,
          handle,
          // following,
          // followers,
          about,
          community: {
            id: communityId,
            name: communityName,
            address: communityAddress,
            city: communityCity,
            state: communityState,
            postcode: communityPostcode,
            country: communityCountry,
            logo: communityLogo,
          },
        },
      } = profileData;
      // console.log("posts", posts);
      // const sortedPosts = sortPostsAscendingTime(posts);

      // const {
      //   user: { avatar, following, followers, name, handle, about },
      // } = profileData;

      content = (
        <View>

          <Text>Your current community</Text>
          <NativeImage uri={communityLogo} style={styles.avatarImage} />
          <Text>{communityName}</Text>
          <Text>{communityAddress}</Text>
          <Text>
            {communityPostcode} {communityCity}
          </Text>
          <Text>{communityState}</Text>
          <Button title="View"></Button>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title="Community"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      <AnimatedSearchBar
        onFocus={onFocus}
        onBlur={onBlur}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search for community..."
      />
      <View style={styles.content}>{content}</View>
      <Modalize
        ref={settingsBottomSheetRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles.settingContainer}
        adjustToContentHeight
      >
        <SettingsBottomSheet
          onAddCommunity={onAddCommunity}
        ></SettingsBottomSheet>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // borderWidth: 1
  },
  content: {
    flex: 1,
  },
  fadeView: {
    flex: 1,
  },
  settingContainer: {
    padding: 20,
    backgroundColor: colors.base,
  },
  avatarImage: {
    height: 44,
    width: 44,
    backgroundColor: colors.placeholder,
    borderRadius: 45,
    marginRight: 10,
  },
});

export default CommunityScreen;
