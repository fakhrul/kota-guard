import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { colors } from "../../../utils";
import { ListEmptyComponent } from "../../../components";
import RemarksCard from "./RemarksCard";

const Remarks = ({ navigation, visitorId, remarks }) => {
  const renderItem = ({ item }) => {
      console.log(item)
  
    const {
      id: remarksId,
      author: { id: authorId, name: authorName },
      caption,
      body,
    createdAt,
    } = item;

    return (
      <RemarksCard
        navigation={navigation}
        visitorId={visitorId}
        remarksId={remarksId}
        authorId={authorId}
        authorName={authorName}
        caption={caption}
        body={body}
        time={createdAt}
      />
    );
  };

  const ListHeaderComponent = () => (
    <Text style={[styles.commentsHeader, { marginBottom }]}>Remarks</Text>
  );

  const marginBottom = remarks.length === 0 ? 0 : 10;

  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      data={remarks}
      renderItem={renderItem}
      style={styles.listStyle}
      ListEmptyComponent={() => (
        <ListEmptyComponent
          placeholder="Remarks not found"
          placeholderStyle={styles.placeholderStyle}
          spacing={10}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  commentsHeader: {
    fontSize: 16,
    color: colors.text01,
    marginTop: 5
  },
  listStyle: {
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
});

export default Remarks;
