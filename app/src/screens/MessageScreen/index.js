import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyMessages from '../../resources/empty-messages.svg';
// import { PollIntervals, IconSizes, Routes, Errors } from '@app/constants';
// import { AppContext } from '@app/context';
import { QUERY_CHATS, QUERY_CHAT_EXISTS } from '../../graphql/query';
// import { Header, MessageScreenPlaceholder, SearchBar, SvgBanner, IconButton } from '@app/layout';
// import { ThemeColors } from '@app/types/theme';
// import { filterChatParticipants, isUserOnline, searchQueryFilter, sortMessageAscendingTime } from '@app/utils/shared';
import MessageCard from './components/MessageCard';
import NewMessageBottomSheet from "./components/NewMessageBottomSheet"
// import NewMessageBottomSheet from './components/NewMessageBottomSheet';

import { Entypo } from '@expo/vector-icons';
// import client from '@app/graphql/client';
import { MUTATION_CREATE_TEMPORARY_CHAT } from '../../graphql/mutation';
// import { useNavigation } from 'react-navigation-hooks';
// import { crashlytics } from '@app/utils/firebase';
// import { tryAgainLaterNotification } from '@app/utils/notifications';
import { Context as AuthContext } from "../../context/AuthContext";
import { colors, filterChatParticipants, isUserOnline, searchQueryFilter, sortMessageAscendingTime, tryAgainLaterNotification } from "../../utils";
import { MessageScreenPlaceholder, Header, SearchBar, SvgBanner } from "../../components";

const MessageScreen = ({ navigation }) => {

  const { state } = useContext(AuthContext);

  const [queryChats, { called, data, loading, error }] = useLazyQuery(QUERY_CHATS, {
    variables: { userId: state.userId },
    fetchPolicy: 'network-only',
    pollInterval: 2000
  });

  const [createTemporaryChat] = useMutation(MUTATION_CREATE_TEMPORARY_CHAT);

  const [chatSearch, setChatSearch] = useState('');
  const newMessageBottomSheetRef = useRef();

  useEffect(() => {
    queryChats();
  }, []);

  const onMorePress = () => {
    newMessageBottomSheetRef.current.open()
  }
  const renderItem = ({ item }) => {

    const { id: chatId, participants, messages } = item;
    const [participant] = filterChatParticipants(state.userId, participants);
    const [lastMessage] = messages;
    // console.log(lastMessage);

    const { id, avatar, handle, lastSeen } = participant;
    const {
      id: messageId,
      author: { id: authorId },
      seen,
      body: messageBody,
      createdAt: time
    } = lastMessage;

    const isOnline = isUserOnline(lastSeen);

    return (
      <MessageCard
        navigation={navigation}
        chatId={chatId}
        participantId={id}
        avatar={avatar}
        handle={handle}
        authorId={authorId}
        messageId={messageId}
        messageBody={messageBody}
        seen={seen}
        time={time}
        isOnline={isOnline}
      />
    );
  };

  let content = <MessageScreenPlaceholder />;

  if (called && !loading && !error) {
    const { chats } = data;

    const filteredChats = searchQueryFilter(chats, state.userId, chatSearch);
    const sortedFilteredChats = sortMessageAscendingTime(filteredChats);

    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={sortedFilteredChats}
        ListEmptyComponent={() => <SvgBanner Svg={EmptyMessages} spacing={16} placeholder='No messages' />}
        style={styles.messagesList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  const onConnectionSelect = async (targetId, avatar, handle) => {
    try {
      const { data: { chatExists } } = await client.query({
        query: QUERY_CHAT_EXISTS,
        variables: { userId: user.id, targetId }
      });

      // @ts-ignore
      newMessageBottomSheetRef.current.close();
      if (chatExists) {
        navigate(Routes.ConversationScreen, { chatId: chatExists.id, avatar, handle, targetId });
      } else {
        const { data } = await createTemporaryChat();
        navigate(Routes.ConversationScreen, { chatId: data.createTemporaryChat.id, avatar, handle, targetId });
      }
    } catch ({ message }) {
      tryAgainLaterNotification();
      crashlytics.recordCustomError(Errors.INITIALIZE_CHAT, message);
    }
  };

  const IconRight = () => <IconButton
    // @ts-ignore
    onPress={() => newMessageBottomSheetRef.current.open()}
    Icon={() =>
      <Entypo
        name='add-to-list'
        size={24}
        color={colors.text01}
      />}
  />

  return (
    <View style={styles.container}>
      <Header
        title="Messages"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      <SearchBar
        value={chatSearch}
        onChangeText={setChatSearch}
        placeholder='Search for chats...'
      />
      {content}
      <NewMessageBottomSheet
        ref={newMessageBottomSheetRef}
        onConnectionSelect={onConnectionSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 4
  }
});

export default MessageScreen;